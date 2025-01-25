import type {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '@kbn/core/server';

import type { RegulAitePluginSetup, RegulAitePluginStart } from './types';
import { defineRoutes } from './routes';

export class RegulAitePlugin implements Plugin<RegulAitePluginSetup, RegulAitePluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('regulAite: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('regulAite: Started');
    return {};
  }

  public stop() {}
}
