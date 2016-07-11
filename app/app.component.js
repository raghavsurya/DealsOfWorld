System.register(['angular2/core', './products/product-list.component', 'angular2/http', 'rxjs/Rx', './services/productService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, product_list_component_1, http_1, productService_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (product_list_component_1_1) {
                product_list_component_1 = product_list_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (productService_1_1) {
                productService_1 = productService_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http, rootVar) {
                    var _this = this;
                    this.pageTitle = 'Deals of World Application';
                    http.get('http://DealsOfWorld.com:3000/api/v1/Menus/' + rootVar).map(function (res) { return res.json(); })
                        .subscribe(function (allMenus) { return _this.menus = allMenus; });
                    http.get('http://DealsOfWorld.com:3000/api/v1/SideMenus/' + rootVar).map(function (res) { return res.json(); })
                        .subscribe(function (allSideMenus) { return _this.sideMenus = allSideMenus; });
                }
                AppComponent.prototype.getProdByType = function (id) {
                    alert(id);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'dw-app',
                        //viewProviders: [HTTP_PROVIDERS],
                        directives: [product_list_component_1.ProductListComponent],
                        providers: [productService_1.ProductService, http_1.HTTP_PROVIDERS],
                        template: "\n\t<div id=\"sticky-anchor\"></div>\n   <div id=\"sticky\" class=\"menuSection\">\n   <div class=\"bg\"></div>\n            <span class=\"showMenuOnMobile\">Show on Mobile</span>\n            <div>\n                <a href=\"#\">\n                    <div class=\"logoSection\">\n                       \n                        \n                    </div>\n                </a>\n                <div id=\"footnote\"> \n                    <div class=\"clearfix\"> \n                    <div class=\"connect\"> \n                    <a href=\"http://www.facebook.com/sharer.php?u=http://dealsofworld.com/\" target=\"_blank\" title=\"Share on Facebook\" class=\"facebook\"></a>\n                    <a href=\"http://twitter.com/home?status=Currently reading http://dealsofworld.com/\" target=\"_blank\" title=\"Share on Twitter\" class=\"twitter\"></a>\n                    <a href=\"https://plus.google.com/share?url=http://dealsofworld.com/\" target=\"_blank\" title=\"Share on Google+\" class=\"googleplus\"></a> \n                    </div> \n                    </div> \n                   <div class=\"showMoreButton red\"><div class=\"shine\"></div><a href=\"#\">Sign in</a></div>\n                 </div>\n\t\t\t\t<div style=\"padding-top:2%\">\n                <div class=\"searchSection\">\n                    <input type=\"text\" placeholder=\"Search\" [(ngModel)]=\"listFilter\" />\n                </div>\n                <div class=\"menuLists\">\n                    <ul>\n                        <li *ngFor='#menu of menus'><button class=\"button button1\"><span>{{menu | uppercase}}</span></button></li>\n                    </ul>\n                </div>\n\t\t\t\t</div>\n            </div>\n        </div>\n\t\t<div class=\"bodyWrapper\">\n        <div id=\"sideMenu\" >\n            <ul id=\"menu-v\">\n                <li *ngFor='#menu of sideMenus><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> {{menu}}}} </a></li>\n                \n            </ul>\n\t\t\t  \n        </div>\n\t\t<div style=\"float:left;width:73%;\"> \n\t\t\t  <dw-products></dw-products>\n\t\t\t  </div>\n\n\t\t\t  \n\t\t\t  </div>\n  \n<div>\n\n    "
                    }),
                    __param(1, core_1.Inject('rootVar')), 
                    __metadata('design:paramtypes', [http_1.Http, String])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//'http://localhost:3000/api/v1/Departments' 
//# sourceMappingURL=app.component.js.map