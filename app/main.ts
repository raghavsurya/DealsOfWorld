import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component'
import {provide} from 'angular2/core'
export function main(rootVar) {
  bootstrap(AppComponent, [
    provide('rootVar', { useValue: rootVar })
  ]);
}