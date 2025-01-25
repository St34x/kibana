import type { PluginInitializerContext } from '@kbn/core/server';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export async function plugin(initializerContext: PluginInitializerContext) {
  const { RegulAitePlugin } = await import('./plugin');
  return new RegulAitePlugin(initializerContext);
}

export type { RegulAitePluginSetup, RegulAitePluginStart } from './types';
