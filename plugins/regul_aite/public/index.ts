import './index.scss';

import { RegulAitePlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new RegulAitePlugin();
}
export type { RegulAitePluginSetup, RegulAitePluginStart } from './types';
