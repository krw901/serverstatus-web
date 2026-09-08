import { useCallback, useEffect, useState } from "react";
import { Col, ConfigProvider, Layout, Row, Spin } from "antd";
import intl from "react-intl-universal";

import ServerRow from "./ServerRow.tsx";
import type { SergateData } from "./types.ts";

import enUS from "./locales/en-US.json";
import zhCN from "./locales/zh-CN.json";
import zhTW from "./locales/zh-TW.json";

const { Header, Footer, Content } = Layout;

const LOCALE_DATA: Record<string, Record<string, string>> = {
  "en-US": enUS,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
};

function resolveLocale(locale: string): keyof typeof LOCALE_DATA {
  const normalized = locale.toLowerCase();
  if (normalized === "zh-tw" || normalized.startsWith("zh-hant") || normalized.startsWith("zh-tw")) {
    return "zh-TW";
  }
  if (normalized.startsWith("zh-")) {
    return "zh-CN";
  }
  return "en-US";
}

const EMPTY_DATA: SergateData = { servers: [], updated: "0" };

export default function App() {
  const [serverData, setServerData] = useState<SergateData>(EMPTY_DATA);
  const [isOnline, setIsOnline] = useState(false);
  const [initDone, setInitDone] = useState(false);

  const initializeIntl = useCallback(async () => {
    if (initDone) {
      return;
    }

    const detected = intl.determineLocale({
      fallbackLocale: "en-US",
    });
    const currentLocale = resolveLocale(detected ?? "en-US");

    await intl.init({
      currentLocale,
      locales: LOCALE_DATA,
    });

    setInitDone(true);
  }, [initDone]);

  useEffect(() => {
    void initializeIntl();

    const fetchData = () => {
      fetch("json/stats.json")
        .then((res) => res.json())
        .then((data: SergateData) => {
          setServerData(data);
          setIsOnline(true);
        })
        .catch((e) => console.log("错误:", e));
    };

    fetchData();
    const itv = setInterval(fetchData, 5000);
    return () => {
      clearInterval(itv);
    };
  }, [initializeIntl]);

  return (
    <div className="App">
      {initDone && (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1677ff",
            },
            components: {
              Layout: {
                headerBg: "#001529",
                headerColor: "#fff",
                headerHeight: 64,
                headerPadding: "0 50px",
                footerBg: "#f0f2f5",
              },
            },
          }}
        >
          <Layout>
            <Header>
              <div className="logo">ServerStatus</div>
            </Header>
            <Content className="app-content">
              <Row justify="center">
                <Col xs={24} sm={23} md={23} lg={22} xl={20} xxl={16}>
                  <Spin size="large" spinning={!isOnline} tip="Loading...">
                    <ServerRow {...serverData} />
                  </Spin>
                </Col>
              </Row>
            </Content>
            <Footer className="footer">
              <a
                href="https://github.com/krwu/ServerStatus-web"
                rel="external noopener"
              >
                WebUI
              </a>{" "}
              for{" "}
              <a
                href="https://github.com/BotoX/ServerStatus/"
                rel="external noopener"
              >
                ServerStatus
              </a>
              , made by{" "}
              <a href="https://www.ofcss.com/" rel="external noopener">
                Kairee
              </a>
            </Footer>
          </Layout>
        </ConfigProvider>
      )}
    </div>
  );
}
