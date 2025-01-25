import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import type { AppMountParameters, CoreStart } from '@kbn/core/public';
import type { AppPluginStartDependencies } from './types';
import { RegulAiteApp } from './components/app';

export const renderApp = (
                          { notifications, http }: CoreStart,
                          { navigation }: AppPluginStartDependencies,
                          { appBasePath, element }: AppMountParameters
                        ) =>
  { render(
      <RegulAiteApp
        basename={appBasePath}
        notifications={notifications}
        http={http}
        navigation={navigation}
      />,
    element
  );

  return () => unmountComponentAtNode(element);
};
