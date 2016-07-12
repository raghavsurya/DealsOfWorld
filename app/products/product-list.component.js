System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', '../pipes/productFilter', '../stars/star.component', '../services/productService'], function(exports_1, context_1) {
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
    var core_1, http_1, productFilter_1, star_component_1, productService_1;
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
            function (star_component_1_1) {
                star_component_1 = star_component_1_1;
            },
            function (productService_1_1) {
                productService_1 = productService_1_1;
            }],
        execute: function() {
            // import {PaginatePipe, PaginationControlsCmp} from 'ng2-pagination';
            // import {PaginatePipe, PaginationService, PaginationControlsCmp, IPaginationInstance} from 'ng2-pagination';
            ProductListComponent = (function () {
                function ProductListComponent(_productService) {
                    this._productService = _productService;
                    this.totalItems = 50;
                    this.currentPage = 0;
                    this.pageTitle = 'Product List';
                    this.headerOfPanel = 'Deals of the world. ';
                    this.listFilter = "";
                    //  this.userselectedMenu = selectedMenu;
                }
                ProductListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._productService.getProducts(0)
                        .subscribe(function (products) { return _this.productByDepts = products; }, function (error) { return _this.errorMessage = error; });
                };
                ProductListComponent.prototype.onRatingClicked = function (message) {
                    this.pageTitle = 'Product List: ' + message;
                };
                ProductListComponent.prototype.getNextSetOfProducts = function (page, userselectedMenu, userselectedSideMenu, searchString, methodName) {
                    var _this = this;
                    this.currentPage = page;
                    if (methodName == "getProductsByVendorAndDept") {
                        this._productService.getProductsByVendorAndDept(page, userselectedMenu, userselectedSideMenu)
                            .subscribe(function (products) { return _this.productByDepts = _this.productByDepts.concat(products); }, function (error) { return _this.errorMessage = error; });
                    }
                    else if (methodName == "getProductsByVendor") {
                        this._productService.getProductsByVendor(page, userselectedMenu)
                            .subscribe(function (products) { return _this.productByDepts = _this.productByDepts.concat(products); }, function (error) { return _this.errorMessage = error; });
                    }
                    else if (methodName == "getProductsByDept") {
                        this._productService.getProductsByDept(page, userselectedMenu)
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
                };
                ProductListComponent = __decorate([
                    core_1.Component({
                        selector: 'dw-products',
                        viewProviders: [http_1.HTTP_PROVIDERS],
                        templateUrl: 'app/products/product-list.component.html',
                        pipes: [productFilter_1.ProductFilterPipe],
                        directives: [star_component_1.StarComponent],
                    }), 
                    __metadata('design:paramtypes', [productService_1.ProductService])
                ], ProductListComponent);
                return ProductListComponent;
            }());
            exports_1("ProductListComponent", ProductListComponent);
        }
    }
});
//# sourceMappingURL=product-list.component.js.map