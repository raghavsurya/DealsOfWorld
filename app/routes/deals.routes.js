System.register(['../products/product-list.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var product_list_component_1;
    var DealsAppRoutes;
    return {
        setters:[
            function (product_list_component_1_1) {
                product_list_component_1 = product_list_component_1_1;
            }],
        execute: function() {
            exports_1("DealsAppRoutes", DealsAppRoutes = [
                { path: '', component: product_list_component_1.ProductListComponent },
                { path: '/:brand/:category', component: product_list_component_1.ProductListComponent },
                { path: '/:brand', component: product_list_component_1.ProductListComponent }
            ]);
        }
    }
});
//# sourceMappingURL=deals.routes.js.map