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
                function AppComponent(http) {
                    var _this = this;
                    this.pageTitle = 'Deals of World Application';
                    http.get('app/ppl.json').map(function (res) { return res.json(); })
                        .subscribe(function (deptLinks) { return _this.deptLinks = deptLinks; });
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
                        template: "\n\t<div id=\"sticky-anchor\"></div>\n   <div id=\"sticky\" class=\"menuSection\">\n   <div class=\"bg\"></div>\n            <span class=\"showMenuOnMobile\">Show on Mobile</span>\n            <div>\n                <a href=\"#\">\n                    <div class=\"logoSection\">\n                       \n                        \n                    </div>\n                </a>\n                <div id=\"footnote\"> \n                    <div class=\"clearfix\"> \n                    <div class=\"connect\"> \n                    <a href=\"http://www.facebook.com/sharer.php?u=http://dealsofworld.com/\" target=\"_blank\" title=\"Share on Facebook\" class=\"facebook\"></a>\n                    <a href=\"http://twitter.com/home?status=Currently reading http://dealsofworld.com/\" target=\"_blank\" title=\"Share on Twitter\" class=\"twitter\"></a>\n                    <a href=\"https://plus.google.com/share?url=http://dealsofworld.com/\" target=\"_blank\" title=\"Share on Google+\" class=\"googleplus\"></a> \n                    </div> \n                    </div> \n                 </div>\n\t\t\t\t<div style=\"padding-top:2%\">\n                <div class=\"searchSection\">\n                    <input type=\"text\" placeholder=\"Search\" [(ngModel)]=\"listFilter\" />\n                </div>\n                <div class=\"menuLists\">\n                    <ul>\n                        <li><button class=\"button button1\"><span>Walmart</span></button></li>\n                        <li><button class=\"button button1\"><span>Macy's</span></button></li>\n                        <li><button class=\"button button1\"><span>Best Buy</span></button></li>\n                        <li><button class=\"button button1\"><span>Amazon</span></button></li>\n                        <li><button class=\"button button1\"><span>Extended Stay America</span></button></li>\n                        <li><button class=\"button button1\"><span>Sam's Club</span></button></li>\n                        <li class=\"showMore\"><button class=\"button moreButton\"><span>More >></span></button></li>\n                      \n                    </ul>\n                </div>\n\t\t\t\t</div>\n            </div>\n        </div>\n\t\t<div class=\"bodyWrapper\">\n        <div id=\"sideMenu\" >\n            <ul id=\"menu-v\">\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Electronics </a></li>\n                <li>\n                    <a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Men</a>\n                   \n                </li>\n                <li>\n                    <a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Women</a>\n                   \n                </li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Food and Drink</a></li>\n                <li>\n                    <a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Shopping</a>\n                   \n                </li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Things to do</a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Baby care and Toys</a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span>  Cruise Travel</a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Tour travel</a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Home Improvement</a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Home and Garden</a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Automtive</a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Resort and Travel</a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Sports and Outdoor</a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-tag\"></span> Entertainment and Media</a></li>\n            </ul>\n\t\t\t  \n        </div>\n\t\t<div style=\"float:left;width:50%;\">\n\t\t\t  <dw-products></dw-products>\n\t\t\t  </div>\n\n\t\t\t  \n\t\t\t  </div>\n  \n<div>\n\n    "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//'http://localhost:3000/api/v1/Departments' 
//# sourceMappingURL=app.component.js.map