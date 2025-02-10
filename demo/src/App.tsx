import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Button,
  ButtonVariant,
  Masthead,
  MastheadMain,
  MastheadToggle,
  MastheadBrand,
  MastheadLogo,
  MastheadContent,
  Page,
  PageSection,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarItem
} from '@patternfly/react-core';
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import { List, Show } from './Pages';
import Navigation from './Navigation';
import logo from '../public/favicon.png';

const jumpToDocs = () => {
  const url = window.location.origin + window.location.pathname + 'docs/';
  window.open(url, '_blank');
};

const App: FC<Record<string, never>> = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  const headerToolbar = (
    <Toolbar>
      <ToolbarContent>
        <ToolbarItem>
          <Button onClick={() => jumpToDocs()} variant={ButtonVariant.primary}>
            Jump to docs
          </Button>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            variant="plain"
            aria-label="Global navigation"
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={() => setSidebarOpen(!isSidebarOpen)}
            id="vertical-nav-toggle"
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo href="https://patternfly.org" target="_blank">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <img src={logo} width="30px" alt="Logo" />
            <span style={{ marginLeft: '10px', marginTop: '10px' }}>Chart builder demo</span>
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );

  const Sidebar = (
    <PageSidebar>
      <PageSidebarBody>
        <Navigation />
      </PageSidebarBody>
    </PageSidebar>
  );

  return (
    <Page masthead={masthead} isManagedSidebar sidebar={Sidebar} style={{ minHeight: '100vh' }}>
      <PageSection isFilled>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/example/:slug" element={<Show />} />
        </Routes>
      </PageSection>
    </Page>
  );
};

export default App;
