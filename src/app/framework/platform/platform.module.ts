// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// libs
import { PlatformService } from './platform.service';
import { RoutingHistoryService } from './routing-history.service';

@NgModule({
  providers: [
		RoutingHistoryService,
		PlatformService
  ]
})
export class PlatformModule {
	static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
	 return {
	   ngModule: PlatformModule,
	   providers: configuredProviders
	 };
	}

	  constructor(@Optional() @SkipSelf() parentModule: PlatformModule) {
    if (parentModule) {
      throw new Error('CoreModule already loaded; import in root module only.');
    }
  }
}
