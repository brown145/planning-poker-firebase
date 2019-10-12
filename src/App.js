import React, { useState } from 'react';
import { Drawer, Layout } from 'antd';

import Head from './components/head';
import Subhead from './components/subhead';
import UserList from './components/userList';
import IssueList from './components/issueList';
import Foot from './components/foot';
import isNarrow from './utility/isNarrow';
import './App.css';

const { Header, Sider, Footer, Content } = Layout;

function App() {
  const [isMobileView, setIsMobileView] = useState(isNarrow());
  const [sideOpenState, setSideOpenState] = useState(!isNarrow());

  const toggleMobileView = () => setIsMobileView(!isMobileView);

  const toggleSideOpenState = () =>
    setSideOpenState(!sideOpenState);

  const renderUserList = () => (
    <UserList
      showDetails={sideOpenState}
    />
  );

  const renderSubHeader = () => (isMobileView) ? (
    <Subhead
      onOpenStateChange={setSideOpenState}
    />
  ) : null;

  const renderSide = () => (isMobileView) ? (
    <Drawer
      title="Room Members"
      placement="left"
      closable={true}
      onClose={toggleSideOpenState}
      visible={sideOpenState}
    >
      {renderUserList()}
    </Drawer>
  ) : (
    <Sider
      theme={'light'}
      collapsed={false}
      width={160}
      collapsedWidth={40}
    >
      {renderUserList()}
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
