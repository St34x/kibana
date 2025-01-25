import React, { useState } from 'react';
import { I18nProvider } from '@kbn/i18n-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from '@kbn/shared-ux-router';
import {
  EuiPageTemplate,
  EuiSideNav,
  EuiProvider,
  EuiButton,
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiListGroup,
  EuiListGroupItem,
  EuiHeaderSectionItemButton,
  EuiHeaderSectionItem,
  EuiHeader,
  EuiIcon,
} from '@elastic/eui';
import type { CoreStart } from '@kbn/core/public';
import type { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';
import ChatInterface from './chat/chat-interface';
import "./app.scss";

interface RegulAiteAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const RegulAiteApp = ({
  basename,
  notifications,
  http,
  navigation,
}: RegulAiteAppDeps) => {

  // Collapsible nav open/close state
  const [isNavOpen, setIsNavOpen] = useState(false);
  // Theme toggling state
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };


  return (
    <>
    <Router basename={basename}>
      <I18nProvider>
        <EuiProvider colorMode={colorMode}>
          {/* No separate toggle button at the top anymore */}

          <EuiPageTemplate panelled={false} grow={true}>
            {/* SIDEBAR */}
            {/*
              1. A top header bar with the burger button on the LEFT.
                This is where the user clicks to open/close the collapsible nav.
            */}
            <EuiHeader position="fixed">
              {/* Left side of the header */}
              <EuiHeaderSectionItem border="right">
                <EuiHeaderSectionItemButton
                  aria-label="Toggle navigation"
                  onClick={toggleNav}
                >
                  <EuiIcon type="menu" />
                </EuiHeaderSectionItemButton>
              </EuiHeaderSectionItem>

              {/* You could add more sections here (like a top-right user menu) */}
            </EuiHeader>

            <EuiCollapsibleNav
              id="mainCollapsibleNav"
              isOpen={isNavOpen}
              onClose={() => setIsNavOpen(false)} // ensures nav closes if user clicks away
            >

              {/*
                Use a flex container to keep nav items at the top
                and the theme toggle button at the bottom.
              */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Top portion: your nav items */}
                <EuiCollapsibleNavGroup title="RegulAIte">
                  <EuiListGroup gutterSize="none">
                    <EuiListGroupItem label="Home" href="#/" />
                    <EuiListGroupItem label="Chat" href="#/chat" />
                    {/* Add more items as needed */}
                  </EuiListGroup>
                </EuiCollapsibleNavGroup>

                {/* Bottom portion: theme toggle */}
                <div style={{ marginTop: 'auto', padding: '1rem' }}>
                  <EuiButton onClick={toggleColorMode} fill>
                    Turn {colorMode === 'light' ? 'dark' : 'light'} theme
                  </EuiButton>
                </div>
              </div>
            </EuiCollapsibleNav>

            {/* MAIN CONTENT AREA */}
            <EuiPageTemplate.Section>
              <Routes>
                <Route
                  path="/chat"
                  component={ChatInterface}
                />
                {/* Add additional routes here if needed */}
              </Routes>
            </EuiPageTemplate.Section>
          </EuiPageTemplate>
        </EuiProvider>
      </I18nProvider>
    </Router>
    </>
  );
};
