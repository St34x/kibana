import type { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';

export interface RegulAitePluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegulAitePluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
