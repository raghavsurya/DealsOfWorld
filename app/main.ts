import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component'
import {provide, enableProdMode} from 'angular2/core'
enableProdMode();
export function main(rootVar) {
  bootstrap(AppComponent, [
    provide('rootVar', { useValue: rootVar })
  ]);
}
//bootstrap(AppComponent)