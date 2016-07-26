System.register(['angular2/platform/browser', './app.component', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, app_component_1, core_1;
    function main(rootVar) {
        browser_1.bootstrap(app_component_1.AppComponent, [
            core_1.provide('rootVar', { useValue: rootVar })
        ]);
    }
    exports_1("main", main);
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
        }
    }
});
//bootstrap(AppComponent) 
//# sourceMappingURL=main.js.map