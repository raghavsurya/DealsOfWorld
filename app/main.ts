import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component'
import {provide, enableProdMode,} from 'angular2/core'

import { DealsAppRoutes } from './routes/deals.routes';
import { ROUTER_DIRECTIVES,RouteConfig, Router, ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy } from 'angular2/router';

export function main(rootVar) {
  bootstrap(AppComponent, [
    provide('rootVar', { useValue: rootVar })
  ]);
}
//bootstrap(AppComponent)