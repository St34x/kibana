import React, { useState }from 'react';
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
  const sideNavItems = [
    {
      name: 'RegulAIte',
      id: 'main',
      href: `#`,
      items: [
        {
          name: 'Chat',
          id: 'chat',
          href: `${basename}/chat`,
        },
      ],
    },
  ];

  // Local state for color mode
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
      <Router basename={basename}>
        <I18nProvider>
          {/*
            1) The Kibana top nav
            2) The main page template below
          */}

          <EuiProvider colorMode={colorMode}>
            {/* A button to toggle dark/light for this plugin only */}
            <div style={{ padding: '1rem' }}>
              <EuiButton onClick={toggleColorMode}>
                Switch to {colorMode === 'light' ? 'dark' : 'light'} theme
              </EuiButton>
            </div>

            {/*
              EuiPageTemplate is the main wrapper.
              `grow` ensures it can fill available height.
            */}
            <EuiPageTemplate
              panelled={false}
              grow={true}
            >
              {/* SIDEBAR */}
              <EuiPageTemplate.Sidebar sticky>
                <EuiSideNav
                  items={sideNavItems}
                  aria-label="Side Navigation"
                />
              </EuiPageTemplate.Sidebar>

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
  );
};
