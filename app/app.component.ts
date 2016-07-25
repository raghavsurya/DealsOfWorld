//Container Component
import { Component, OnInit, Inject, AfterViewInit, ViewChild, Input } from 'angular2/core'
import { ProductListComponent } from './products/product-list.component'
import { Http, HTTP_PROVIDERS } from 'angular2/http'
import 'rxjs/Rx'; //for map from http response & Load all features
import {IDepartments} from './Interfaces/Departments'
import {IProductType} from './Interfaces/Departments'

import {Observer} from 'rxjs/Observer';
import {ProductService} from './services/productService'
import {Observable} from 'rxjs/Observable'
import myGlobals = require('./globals');


@Component({
  selector: 'dw-app',
  //viewProviders: [HTTP_PROVIDERS],
  directives: [ProductListComponent],
  providers: [ProductService, HTTP_PROVIDERS],//define it only once here so it will be a singleton instance
  template: `




	<div id="sticky-anchor"></div>
<div id="sticky" class="menuSection">
<div class="allCategories">


<div class="scWrapper">


   <div class="socialIcons">
    
        <div class="">
          <a href="http://www.facebook.com/sharer.php?u=http://dealsofworld.com/" target="_blank" title="Share on Facebook" class="facebook"><img src="app/Assets/Images/Icon_facebook.png" height="20" /></a>
          <a href="http://twitter.com/home?status=Currently reading http://dealsofworld.com/" target="_blank" title="Share on Twitter"
            class="twitter"><img src="app/Assets/Images/twitter.png" height="20" /></a>
          <a href="https://plus.google.com/share?url=http://dealsofworld.com/" target="_blank" title="Share on Google+" class="googleplus">
          <img src="app/Assets/Images/Google_plus.png" height="20" /></a>
        </div>
    
    
    </div>
</div>
   <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><img src="app/Assets/Images/{{country}}.png" />
  <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <li>
            <a href="#" (click)="ChangeCountry('uk')"><img src="app/Assets/Images/UK.png" alt="" /><span> UK</span></a>
          </li>
          <li>
            <a href="#" (click)="ChangeCountry('us')"><img src="app/Assets/Images/US.png" alt="" /><span>  USA</span></a>
          </li>
          <li>
            <a href="#" (click)="ChangeCountry('in')"><img src="app/Assets/Images/IN.png" alt="" /><span>  India</span></a>
          </li>
        </ul>
      </div>
</div>
  <span class="showMenuOnMobile"></span>
    <a href="#">
      <div class="logoSection">


      </div>
      
    </a>
    
   
    <div class="dropdown vendorDropdown">
        <button class="btn btn-danger dropdown-toggle " type="button" data-toggle="dropdown">Vendors
  <span class="caret"></span></button>
        <ul class="dropdown-menu">
         <li *ngFor='#menu of menus'><a href="#" (click)="LoadProductsAndMenus(menu, true)"><span class="glyphicon glyphicon-tag"></span>{{menu}}</a></li>
        </ul>
        </div>
          <div class="dropdown categoryDropdown">
        <button class="btn btn-danger dropdown-toggle " type="button" data-toggle="dropdown">Categories
  <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <li *ngFor='#menu of sideMenus'><a href="#" (click)="LoadProductsAndMenus(menu, false)"><span class="glyphicon glyphicon-tag"></span>{{menu}}</a></li>
        </ul>
        </div>
    <div class="searchWrapper">
   
      <section class="webdesigntuts-workshop">

        <form>

          <input [(ngModel)]="searchString" type="search" placeholder="What are you looking for?">
          <button (click)="SearchProducts()" class="button button1">Search</button>
        </form>

      </section>

      <div class="menuLists">
        <ul>
          <li *ngFor='#menuItem of menus'>
            <div class="dropdown">
  	          <button class="button button1 " on-mouseover="LoadProductsAndMenus(menuItem, true, true)" type="button" data-toggle="dropdown">{{menuItem}}
          </button>
        <ul class="dropdown-menu" *ngIf="showDropdown">
          <li *ngFor='#menu of sideMenus'><a href="#" (click)="LoadProductsAndMenus(menu, false)"><span class="glyphicon glyphicon-tag"></span>{{menu}}</a></li>
        </ul>
       
        </div>
          
          </li>
        </ul>
      </div>
    </div>
</div>
<div class="bodyWrapper">
  
  <div class="productWrapper">
    <dw-products [selectedMenu]="userselectedMenu">
    
    </dw-products>
  </div>


</div>

`

})

export class AppComponent {
  testRootVar: string
  methodName: string;
  showLoader: boolean;
  menus: any[];
  searchString: string
  sideMenus: any[];
  deptLinks: IDepartments[];
  country: string;
  selectedMenu: string;
  selectedSideMenu: string;
  isMainMenu: boolean;
  showDropdown: boolean = true;
  @ViewChild(ProductListComponent) productList: ProductListComponent;
  ngAfterViewInit() {
    this.getChildProperty();
  }
  getChildProperty() {
    console.log(this.productList.productByDepts);
    if (this.searchString != undefined) {
      this.productList.listFilter = this.searchString;
    }
  }

  pageTitle: string = 'Deals of World Application';
  constructor(http: Http, @Inject('rootVar') rootVar: string, private _productService: ProductService) {
    http.get('http://DealsOfWorld.com:3000/api/v1/Menus/' + rootVar).map(res => res.json())
      .subscribe(allMenus => this.menus = allMenus);
    http.get('http://DealsOfWorld.com:3000/api/v1/SideMenus/' + rootVar + '/all').map(res => res.json())
      .subscribe(allSideMenus => this.sideMenus = allSideMenus);
    this.country = rootVar.toUpperCase();

    // _productService.getDeptLinks(0).subscribe(products =>this.deptLinks = products);
    //    console.log(this.deptLinks)

  }

  LoadProductsAndMenus(menu: string, isMainMenu: boolean, isHover:boolean=false): void {
     this.showDropdown = true;
    this.productList.showLoader = true;
    this.isMainMenu = isMainMenu;
    this.productList.currentPage = 0;
    if (this.isMainMenu) {
      this.selectedMenu = menu;
      this.productList.userselectedMenu = this.selectedMenu;
      this.selectedSideMenu = null
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
        .subscribe(products => this.productList.productByDepts = products);
     
     

    }
    //When filtering only by Vendors
    else if (this.selectedMenu != null && this.selectedSideMenu == null) {
       if(!isHover){
      this.productList.methodName = "getProductsByVendor";
      this._productService.getProductsByVendor(0, this.selectedMenu)
        .subscribe(products => this.productList.productByDepts = products);
       }

    }
    //When filtering only by Side menu
    else if (this.selectedSideMenu != null && this.selectedMenu == null) {
      this.productList.methodName = "getProductsByDept";
      this._productService.getProductsByDept(0, this.selectedSideMenu)
        .subscribe(products => this.productList.productByDepts = products);
    }
     this._productService.getSubMenusByVendor(this.selectedMenu)
        .subscribe(products => this.sideMenus = products);
    this.productList.showLoader = false;
  }
  ChangeCountry(country: string): void {
    this.productList.currentPage = 0;
    this.productList.showLoader = true;
    sessionStorage["countryCode"] = country;
    window.location.reload();

  }

  SearchProducts(): void {
    this.productList.currentPage = 0;
    this.productList.showLoader = true;
    this.productList.methodName = "getProductsBySearchTerm";
    this.productList.searchStr = this.searchString;
    if (!this.productList.searchStr) {
      this.productList.searchStr = "";
    }
    this._productService.getProductsBySearchTerm(0, this.searchString)
      .subscribe(products => this.productList.productByDepts = products);
    this.productList.showLoader = false;
  }

}



//'http://localhost:3000/api/v1/Departments'