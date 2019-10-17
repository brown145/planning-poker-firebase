import "./App.css";

import { Drawer, Layout, Modal } from "antd";
import React, { useEffect, useState } from "react";

import Foot from "./components/foot";
import Head from "./components/head";
import IssueList from "./components/issueList";
import Subhead from "./components/subhead";
import UserList from "./components/userList";
import isMobile from "ismobilejs";

const { Header, Sider, Footer, Content } = Layout;
const { confirm } = Modal;

const probablyMobile = isMobile(window.navigator.userAgent).any;

const goFullscreen = () => window.document.body.requestFullscreen();

function App() {
  const [isMobileView, setIsMobileView] = useState(probablyMobile);
  const [sideOpenState, setSideOpenState] = useState(!probablyMobile);

  useEffect(() => {
    if (isMobileView) {
      confirm({
        title: "View in fullscreen mode",
        icon: "fullscreen",
        onOk: goFullscreen,
        onCancel: () => {}
      });
    }
  }, [isMobileView]);

  const toggleMobileView = () => {
    setIsMobileView(!isMobileView);
    setSideOpenState(isMobileView);
  };

  const toggleSideOpenState = () => setSideOpenState(!sideOpenState);

  const renderUserList = isSideOpen => <UserList showDetails={isSideOpen} />;

  const renderSubHeader = () =>
    isMobileView ? <Subhead onOpenStateChange={setSideOpenState} /> : null;

  const renderSide = () =>
    isMobileView ? (
      <Drawer
        title="Room Members"
        placement="left"
        closable={true}
        onClose={toggleSideOpenState}
        visible={sideOpenState}
      >
        {renderUserList(sideOpenState)}
      </Drawer>
    ) : (
      <Sider theme={"light"} collapsed={false} width={160} collapsedWidth={40}>
        {renderUserList(true)}
      </Sider>
    );

  return (
    <Layout className="appMain">
      <Header>
        <Head />
      </Header>
      {renderSubHeader()}
      <Layout className="appBody">
        {renderSide()}
        <Content className="appContent">
          <IssueList />
        </Content>
      </Layout>
      <Footer>
        <Foot
          onMobileViewChange={toggleMobileView}
          isMobileView={isMobileView}
        />
      </Footer>
    </Layout>
  );
}

export default App;
