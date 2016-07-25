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
                function AppComponent(http, rootVar, _productService) {
                    var _this = this;
                    this._productService = _productService;
                    this.showDropdown = true;
                    this.pageTitle = 'Deals of World Application';
                    http.get('http://DealsOfWorld.com/api/v1/Menus/' + rootVar).map(function (res) { return res.json(); })
                        .subscribe(function (allMenus) { return _this.menus = allMenus; });
                    http.get('http://DealsOfWorld.com/api/v1/SideMenus/' + rootVar + '/all').map(function (res) { return res.json(); })
                        .subscribe(function (allSideMenus) { return _this.sideMenus = allSideMenus; });
                    this.country = rootVar.toUpperCase();
                    // _productService.getDeptLinks(0).subscribe(products =>this.deptLinks = products);
                    //    console.log(this.deptLinks)
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    this.getChildProperty();
                };
                AppComponent.prototype.getChildProperty = function () {
                    console.log(this.productList.productByDepts);
                    if (this.searchString != undefined) {
                        this.productList.listFilter = this.searchString;
                    }
                };
                AppComponent.prototype.LoadProductsAndMenus = function (menu, isMainMenu, isHover) {
                    var _this = this;
                    if (isHover === void 0) { isHover = false; }
                    this.showDropdown = true;
                    this.productList.showLoader = true;
                    this.isMainMenu = isMainMenu;
                    this.productList.currentPage = 0;
                    if (this.isMainMenu) {
                        this.selectedMenu = menu;
                        this.productList.userselectedMenu = this.selectedMenu;
                        this.selectedSideMenu = null;
                        this.productList.userselectedSideMenu = null;
                    }
                    else {
                        this.selectedSideMenu = menu;
                        this.productList.userselectedSideMenu = this.selectedSideMenu;
                        this.showDropdown = false;
                    }
                    //When filtering both by Vendor and Side menu
                    if (this.selectedMenu != null && this.selectedSideMenu != null) {
                        this.productList.methodName = "getProductsByVendorAndDept";
                        this._productService.getProductsByVendorAndDept(0, this.selectedMenu, this.selectedSideMenu)
                            .subscribe(function (products) { return _this.productList.productByDepts = products; });
                    }
                    else if (this.selectedMenu != null && this.selectedSideMenu == null) {
                        if (!isHover) {
                            this.productList.methodName = "getProductsByVendor";
                            this._productService.getProductsByVendor(0, this.selectedMenu)
                                .subscribe(function (products) { return _this.productList.productByDepts = products; });
                        }
                    }
                    else if (this.selectedSideMenu != null && this.selectedMenu == null) {
                        this.productList.methodName = "getProductsByDept";
                        this._productService.getProductsByDept(0, this.selectedSideMenu)
                            .subscribe(function (products) { return _this.productList.productByDepts = products; });
                    }
                    this._productService.getSubMenusByVendor(this.selectedMenu)
                        .subscribe(function (products) { return _this.sideMenus = products; });
                    this.productList.showLoader = false;
                };
                AppComponent.prototype.ChangeCountry = function (country) {
                    this.productList.currentPage = 0;
                    this.productList.showLoader = true;
                    sessionStorage["countryCode"] = country;
                    window.location.reload();
                };
                AppComponent.prototype.SearchProducts = function () {
                    var _this = this;
                    this.productList.currentPage = 0;
                    this.productList.showLoader = true;
                    this.productList.methodName = "getProductsBySearchTerm";
                    this.productList.searchStr = this.searchString;
                    if (!this.productList.searchStr) {
                        this.productList.searchStr = "";
                    }
                    this._productService.getProductsBySearchTerm(0, this.searchString)
                        .subscribe(function (products) { return _this.productList.productByDepts = products; });
                    this.productList.showLoader = false;
                };
                __decorate([
                    core_1.ViewChild(product_list_component_1.ProductListComponent), 
                    __metadata('design:type', product_list_component_1.ProductListComponent)
                ], AppComponent.prototype, "productList", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'dw-app',
                        //viewProviders: [HTTP_PROVIDERS],
                        directives: [product_list_component_1.ProductListComponent],
                        providers: [productService_1.ProductService, http_1.HTTP_PROVIDERS],
                        template: "\n\n\n\n\n\t<div id=\"sticky-anchor\"></div>\n<div id=\"sticky\" class=\"menuSection\">\n<div class=\"allCategories\">\n\n\n<div class=\"scWrapper\">\n\n\n   <div class=\"socialIcons\">\n    \n        <div class=\"\">\n          <a href=\"http://www.facebook.com/sharer.php?u=http://dealsofworld.com/\" target=\"_blank\" title=\"Share on Facebook\" class=\"facebook\"><img src=\"app/Assets/Images/Icon_facebook.png\" height=\"20\" /></a>\n          <a href=\"http://twitter.com/home?status=Currently reading http://dealsofworld.com/\" target=\"_blank\" title=\"Share on Twitter\"\n            class=\"twitter\"><img src=\"app/Assets/Images/twitter.png\" height=\"20\" /></a>\n          <a href=\"https://plus.google.com/share?url=http://dealsofworld.com/\" target=\"_blank\" title=\"Share on Google+\" class=\"googleplus\">\n          <img src=\"app/Assets/Images/Google_plus.png\" height=\"20\" /></a>\n        </div>\n    \n    \n    </div>\n</div>\n   <div class=\"dropdown\">\n        <button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"><img src=\"app/Assets/Images/{{country}}.png\" />\n  <span class=\"caret\"></span></button>\n        <ul class=\"dropdown-menu\">\n          <li>\n            <a href=\"#\" (click)=\"ChangeCountry('uk')\"><img src=\"app/Assets/Images/UK.png\" alt=\"\" /><span> UK</span></a>\n          </li>\n          <li>\n            <a href=\"#\" (click)=\"ChangeCountry('us')\"><img src=\"app/Assets/Images/US.png\" alt=\"\" /><span>  USA</span></a>\n          </li>\n          <li>\n            <a href=\"#\" (click)=\"ChangeCountry('in')\"><img src=\"app/Assets/Images/IN.png\" alt=\"\" /><span>  India</span></a>\n          </li>\n        </ul>\n      </div>\n</div>\n  <span class=\"showMenuOnMobile\"></span>\n    <a href=\"#\">\n      <div class=\"logoSection\">\n\n\n      </div>\n      \n    </a>\n    \n   \n    <div class=\"dropdown vendorDropdown\">\n        <button class=\"btn btn-danger dropdown-toggle \" type=\"button\" data-toggle=\"dropdown\">Stores\n  <span class=\"caret\"></span></button>\n        <ul class=\"dropdown-menu\">\n         <li *ngFor='#menu of menus'><a href=\"#\" (click)=\"LoadProductsAndMenus(menu, true)\"><span class=\"glyphicon glyphicon-tag\"></span>{{menu}}</a></li>\n        </ul>\n        </div>\n          <div class=\"dropdown categoryDropdown\">\n        <button class=\"btn btn-danger dropdown-toggle \" type=\"button\" data-toggle=\"dropdown\">Categories\n  <span class=\"caret\"></span></button>\n        <ul class=\"dropdown-menu\">\n          <li *ngFor='#menu of sideMenus'><a href=\"#\" (click)=\"LoadProductsAndMenus(menu, false)\"><span class=\"glyphicon glyphicon-tag\"></span>{{menu}}</a></li>\n        </ul>\n        </div>\n    <div class=\"searchWrapper\">\n   \n      <section class=\"webdesigntuts-workshop\">\n\n        <form>\n\n          <input [(ngModel)]=\"searchString\" type=\"search\" placeholder=\"What are you looking for?\">\n          <button (click)=\"SearchProducts()\" class=\"button button1\">Search</button>\n        </form>\n\n      </section>\n\n      <div class=\"menuLists\">\n        <ul>\n          <li *ngFor='#menuItem of menus'>\n            <div class=\"dropdown\">\n  \t          <button class=\"button button1 \" on-mouseover=\"LoadProductsAndMenus(menuItem, true, true)\" type=\"button\" data-toggle=\"dropdown\">{{menuItem}}\n          </button>\n        <ul class=\"dropdown-menu\" *ngIf=\"showDropdown\">\n          <li *ngFor='#menu of sideMenus'><a href=\"#\" (click)=\"LoadProductsAndMenus(menu, false)\"><span class=\"glyphicon glyphicon-tag\"></span>{{menu}}</a></li>\n        </ul>\n       \n        </div>\n          \n          </li>\n        </ul>\n      </div>\n    </div>\n</div>\n<div class=\"bodyWrapper\">\n  \n  <div class=\"productWrapper\">\n    <dw-products [selectedMenu]=\"userselectedMenu\">\n    \n    </dw-products>\n  </div>\n\n\n</div>\n\n"
                    }),
                    __param(1, core_1.Inject('rootVar')), 
                    __metadata('design:paramtypes', [http_1.Http, String, productService_1.ProductService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//'http://localhost:3000/api/v1/Departments' 
//# sourceMappingURL=app.component.js.map