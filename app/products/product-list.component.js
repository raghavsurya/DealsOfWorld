System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', '../pipes/productFilter', '../services/productService', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, http_1, productFilter_1, productService_1, router_1;
    var ProductListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (productFilter_1_1) {
                productFilter_1 = productFilter_1_1;
            },
            function (productService_1_1) {
                productService_1 = productService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            // import {PaginatePipe, PaginationControlsCmp} from 'ng2-pagination';
            // import {PaginatePipe, PaginationService, PaginationControlsCmp, IPaginationInstance} from 'ng2-pagination';
            ProductListComponent = (function () {
                function ProductListComponent(_productService, rootVar, _routeParams) {
                    var _this = this;
                    this._productService = _productService;
                    this._routeParams = _routeParams;
                    this.showTwoPerRow = false;
                    this.showDropdown = true;
                    this.totalItems = 50;
                    this.currentPage = 0;
                    this.pageTitle = 'Product List';
                    this.headerOfPanel = 'Deals of the world. ';
                    this.listFilter = "";
                    this.methodName = "";
                    this.searchStr = "";
                    this.isSearch = false;
                    this.showHeart = false;
                    this.country = rootVar;
                    this.userselectedMenu = _routeParams.get('brand');
                    if (this.userselectedMenu) {
                        this.userselectedMenu = this.userselectedMenu.split('-').join(' ');
                    }
                    this.userselectedSideMenu = _routeParams.get('category');
                    if (this.userselectedSideMenu) {
                        this.userselectedSideMenu = this.userselectedSideMenu.split('-').join(' ');
                    }
                    //  this.userselectedMenu = userselectedMenu;
                    if (this.userselectedMenu != null && this.userselectedSideMenu != null) {
                        this.methodName = "getProductsByVendorAndDept";
                        this._productService.getProductsByVendorAndDept(0, this.userselectedMenu, this.userselectedSideMenu)
                            .subscribe(function (products) { return _this.productByDepts = products; });
                    }
                    else if (this.userselectedMenu != null && this.userselectedSideMenu == null) {
                        this.methodName = "getProductsByVendor";
                        this._productService.getProductsByVendor(0, this.userselectedMenu)
                            .subscribe(function (products) { return _this.productByDepts = products; });
                    }
                    else if (this.userselectedSideMenu != null && this.userselectedMenu == null) {
                        this.methodName = "getProductsByDept";
                        this._productService.getProductsByDept(0, this.userselectedSideMenu)
                            .subscribe(function (products) { return _this.productByDepts = products; });
                    }
                    else if (!this.userselectedSideMenu && !this.userselectedMenu) {
                        this._productService.getProducts(0)
                            .subscribe(function (products) { return _this.productByDepts = products; }, function (error) { return _this.errorMessage = error; });
                    }
                }
                ProductListComponent.prototype.ngOnInit = function () {
                    // this._productService.getProducts(0)
                    //     .subscribe(products => this.productByDepts = products,
                    //     error => this.errorMessage = <any>error);
                };
                ProductListComponent.prototype.onRatingClicked = function (message) {
                    this.pageTitle = 'Product List: ' + message;
                };
                ProductListComponent.prototype.getNextSetOfProducts = function (page, userselectedMenu, userselectedSideMenu, searchString, methodName) {
                    var _this = this;
                    this.showLoader = true;
                    this.currentPage = page;
                    if (methodName == "getProductsByVendorAndDept") {
                        this._productService.getProductsByVendorAndDept(page, userselectedMenu, userselectedSideMenu, this.sortTerm)
                            .subscribe(function (products) { return _this.productByDepts = _this.productByDepts.concat(products); }, function (error) { return _this.errorMessage = error; });
                    }
                    else if (methodName == "getProductsByVendor") {
                        this._productService.getProductsByVendor(page, userselectedMenu)
                            .subscribe(function (products) { return _this.productByDepts = _this.productByDepts.concat(products); }, function (error) { return _this.errorMessage = error; });
                    }
                    else if (methodName == "getProductsByDept") {
                        this._productService.getProductsByDept(page, userselectedSideMenu)
                            .subscribe(function (products) { return _this.productByDepts = _this.productByDepts.concat(products); }, function (error) { return _this.errorMessage = error; });
                    }
                    else if (methodName == "getProductsBySearchTerm") {
                        this._productService.getProductsBySearchTerm(page, searchString)
                            .subscribe(function (products) { return _this.productByDepts = _this.productByDepts.concat(products); }, function (error) { return _this.errorMessage = error; });
                    }
                    else {
                        this._productService.getProducts(page)
                            .subscribe(function (products) { return _this.productByDepts = _this.productByDepts.concat(products); }, function (error) { return _this.errorMessage = error; });
                    }
                    this.showLoader = false;
                };
                ProductListComponent.prototype.SetSortOrder = function (sortTerm, userselectedMenu, userselectedSideMenu, page) {
                    //    this.productByDepts = this.productByDepts.sort((obj1: IProductsByDept, obj2: IProductsByDept =>{
                    var _this = this;
                    //    });
                    //    );
                    this.sortTerm = sortTerm;
                    this.showDropdown = false;
                    this.currentPage = page;
                    this._productService.getProductsByVendorAndDept(0, userselectedMenu, userselectedSideMenu, sortTerm == "+" ? "hightolow" : "lowtohigh")
                        .subscribe(function (products) { return _this.productByDepts = products; }, function (error) { return _this.errorMessage = error; });
                    //if(sortTerm == "+") this.productByDepts = this.productByDepts.reverse();
                };
                ProductListComponent.prototype.SortArray = function (items, sortTerm) {
                    var vals = items.slice(3);
                    vals.sort(function (a, b) {
                        var leftOfferPrice = Number.parseInt(a.offerPrice.substring(1).split(".")[0]);
                        var rightOfferPrice = Number.parseInt(b.offerPrice.substring(1).split(".")[0]);
                        if (leftOfferPrice < rightOfferPrice)
                            return -1;
                        if (leftOfferPrice > rightOfferPrice)
                            return 1;
                        return 0;
                    });
                    console.log(vals.length);
                    return vals;
                };
                ProductListComponent.prototype.IsDealGood = function (actualPrice, offerPrice) {
                    if (offerPrice && actualPrice && typeof offerPrice == 'string') {
                        var leftOfferPrice = Number.parseInt(offerPrice.replace(/^\D+/g, '').split(".")[0]);
                        var rightOfferPrice = Number.parseInt(actualPrice.replace(/^\D+/g, '').split(".")[0]);
                        if (leftOfferPrice && rightOfferPrice) {
                            if (100 - ((leftOfferPrice / rightOfferPrice) * 100) > 30) {
                                this.dealPercent = 100 - Math.round((leftOfferPrice / rightOfferPrice) * 100);
                                return true;
                            }
                            else {
                                this.dealPercent = Math.round((leftOfferPrice / rightOfferPrice) * 100);
                                return false;
                            }
                        }
                    }
                    return false;
                };
                ProductListComponent = __decorate([
                    core_1.Component({
                        selector: 'dw-products',
                        viewProviders: [http_1.HTTP_PROVIDERS],
                        templateUrl: 'app/products/product-list.component.html',
                        pipes: [productFilter_1.ProductFilterPipe],
                        directives: [router_1.ROUTER_DIRECTIVES],
                    }),
                    __param(1, core_1.Inject('rootVar')), 
                    __metadata('design:paramtypes', [productService_1.ProductService, String, router_1.RouteParams])
                ], ProductListComponent);
                return ProductListComponent;
            }());
            exports_1("ProductListComponent", ProductListComponent);
        }
    }
});
//# sourceMappingURL=product-list.component.js.map