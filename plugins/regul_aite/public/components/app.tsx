import React, { useState } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n-react';
import { BrowserRouter as Router, Route, Routes } from '@kbn/shared-ux-router';
import { EuiButton, EuiHorizontalRule, EuiPageTemplate, EuiTitle, EuiText, EuiSideNav } from '@elastic/eui';
import type { CoreStart } from '@kbn/core/public';
import type { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';
import ChatInterface from './chat/chat-interface';

interface RegulAiteAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

interface ExampleResponse {
  time: string;
}

export const RegulAiteApp = ({ basename, notifications, http, navigation }: RegulAiteAppDeps) => {
  const [timestamp, setTimestamp] = useState<string | undefined>();

  const sideNavItems = [
    {
      name: PLUGIN_NAME,
      id: 'main',
      href: `${basename}`,
      items: [
        { name: 'Chat', id: 'chat', href: `${basename}/regulaite` },
      ],
    },
  ];

  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={false}
            useDefaultBehaviors={true}
          />
          <EuiPageTemplate restrictWidth="1000px">
            <EuiSideNav items={sideNavItems} aria-label="Side Navigation" />
            <Routes>
              {/* Home Route */}
              <Route
                path="/regulaite/chat"
                render={() => (
                  <EuiPageTemplate.Section>
                    <ChatInterface />
                  </EuiPageTemplate.Section>
                )}
              />
            </Routes>
          </EuiPageTemplate>
        </>
      </I18nProvider>
    </Router>
  );
};
