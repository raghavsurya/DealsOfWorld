System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var ProductService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            ProductService = (function () {
                // rootVar: string = "us";
                function ProductService(_http, rootVar) {
                    this._http = _http;
                    this.countryCode = rootVar;
                }
                // constructor(private _http: Http){
                //     this.countryCode = this.rootVar;
                // }
                ProductService.prototype.getDeptLinks = function (startIndex) {
                    return this._http.get('http://DealsOfWorld.com:3000/api/v1/GetAllSideMenus/' + this.countryCode)
                        .map(function (res) { return res.json(); });
                    //   .do(data => console.log('Data returned: ' +JSON.stringify(data)))
                };
                ProductService.prototype.getProducts = function (startIndex) {
                    return this._http.get('http://DealsOfWorld.com:3000/api/v1/Products/' + startIndex + '/' + this.countryCode)
                        .map(function (res) { return res.json(); });
                    //   .do(data => console.log('Data returned: ' +JSON.stringify(data)))
                };
                ProductService.prototype.getSubMenusByVendor = function (vendor) {
                    return this._http.get('http://DealsOfWorld.com:3000/api/v1/Menus/' + this.countryCode + "/" + vendor)
                        .map(function (res) { return res.json(); });
                };
                ProductService.prototype.getProductsByVendor = function (page, mainMenu) {
                    return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsByVendor/' + page + "/" + this.countryCode + '/' + mainMenu)
                        .map(function (res) { return res.json(); });
                };
                ProductService.prototype.getProductsByVendorAndDept = function (page, mainMenu, department) {
                    return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsByDeptByVendor/' + page + "/" + this.countryCode + '/' + department + "/" + mainMenu)
                        .map(function (res) { return res.json(); });
                };
                ProductService.prototype.getProductsByDept = function (page, department) {
                    return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsByDept/' + page + "/" + this.countryCode + '/' + department)
                        .map(function (res) { return res.json(); });
                };
                ProductService.prototype.getProductsBySearchTerm = function (page, searchTerm) {
                    return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsBySearchTerm/' + page + "/" + this.countryCode + '/' + searchTerm)
                        .map(function (res) { return res.json(); });
                };
                ProductService.prototype.ngOnInit = function () {
                    console.log('In OnInit');
                };
                ProductService = __decorate([
                    core_1.Component({}),
                    core_1.Injectable(),
                    __param(1, core_1.Inject('rootVar')), 
                    __metadata('design:paramtypes', [http_1.Http, String])
                ], ProductService);
                return ProductService;
            }());
            exports_1("ProductService", ProductService);
        }
    }
});
//# sourceMappingURL=productService.js.map