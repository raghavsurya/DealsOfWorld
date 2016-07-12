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


@Component({
    selector: 'dw-app',
    //viewProviders: [HTTP_PROVIDERS],
    directives: [ProductListComponent],
    providers: [ProductService, HTTP_PROVIDERS],//define it only once here so it will be a singleton instance
    template: `
	<div id="sticky-anchor"></div>
   <div id="sticky" class="menuSection">
   <div class="bg"></div>
            <span class="showMenuOnMobile">Show on Mobile</span>
            <div>
                <a href="#">
                    <div class="logoSection">
                       
                        
                    </div>
                </a>
                <div id="footnote"> 
                    <div class="clearfix"> 
                    <div class="connect"> 
                    <a href="http://www.facebook.com/sharer.php?u=http://dealsofworld.com/" target="_blank" title="Share on Facebook" class="facebook"></a>
                    <a href="http://twitter.com/home?status=Currently reading http://dealsofworld.com/" target="_blank" title="Share on Twitter" class="twitter"></a>
                    <a href="https://plus.google.com/share?url=http://dealsofworld.com/" target="_blank" title="Share on Google+" class="googleplus"></a> 
                    </div> 
                    </div> 
                   <div class="showMoreButton red"><div class="shine"></div><a href="#">Sign in</a></div>
                 </div>
				<div style="padding-top:2%">~
                <div class="searchSection">
                    <input type="text" placeholder="Search" [(ngModel)]="listFilter" />
                   <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><img src="app/Assets/Images/{{country}}.png" />
  <span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><a href="#" (click)="ChangeCountry('uk')"><img src="app/Assets/Images/UK.png" alt="" /><span> UK</span></a></li>
    <li><a href="#" (click)="ChangeCountry('us')"><img src="app/Assets/Images/US.png" alt="" /><span>  USA</span></a></li>
    <li><a href="#" (click)="ChangeCountry('in')"><img src="app/Assets/Images/IN.png" alt="" /><span>  India</span></a></li>
  </ul>
</div>
                </div>
                <div class="menuLists">
                    <ul>
                        <li *ngFor='#menu of menus'><button class="button button1" (click)="LoadProductsAndMenus(menu, true)"><span>{{menu}}</span></button></li>
                    </ul>
                </div> 
				</div>
            </div>
        </div>
		<div class="bodyWrapper">
        <div id="sideMenu" >
            <ul id="menu-v">
                <li *ngFor='#menu of sideMenus'><a href="#" (click)="LoadProductsAndMenus(menu, false)"><span class="glyphicon glyphicon-tag"></span> {{menu}} </a></li>
                </ul>
			  
        </div>
		<div style="float:left;width:73%;"> 
			  <dw-products [selectedMenu]= "userselectedMenu"></dw-products>
			  </div>

			  
			  </div>
  
<div>

    `
    
})

export class AppComponent  {
 
    menus: any[];
    sideMenus: any[];
    deptLinks: IDepartments[];
    country: string;
  selectedMenu: string;
     selectedSideMenu: string;
    isMainMenu: boolean;
     @ViewChild(ProductListComponent) productList:ProductListComponent;
  ngAfterViewInit() {
      this.getChildProperty();
  }
  getChildProperty() {
     console.log(this.productList.productByDepts);

  }
    
    pageTitle: string = 'Deals of World Application';
     constructor(http: Http, @Inject('rootVar') rootVar:string, private _productService: ProductService  ){
            http.get('http://DealsOfWorld.com:3000/api/v1/Menus/'+ rootVar).map(res => res.json())
    .subscribe(allMenus => this.menus = allMenus) ;
      http.get('http://DealsOfWorld.com:3000/api/v1/SideMenus/'+ rootVar + '/all').map(res => res.json())
    .subscribe(allSideMenus => this.sideMenus = allSideMenus) ;
    this.country = rootVar.toUpperCase();
    }
 
LoadProductsAndMenus(menu: string, isMainMenu: boolean) : void{

this.isMainMenu = isMainMenu;
    if(this.isMainMenu){
        this.selectedMenu = menu;
        this.productList.userselectedMenu = this.selectedMenu;
    }
    else{
        this.selectedSideMenu = menu;
         this.productList.userselectedSideMenu = this.selectedSideMenu;
    }
    //When filtering both by Vendor and Side menu
    if(this.selectedMenu != null && this.selectedSideMenu != null){
        this._productService.getProductsByVendorAndDept(this.selectedMenu, this.selectedSideMenu )
       .subscribe(products => this.productList.productByDepts = products);
   
    }
    //When filtering only by Vendors
    else if(this.selectedMenu != null && this.selectedSideMenu == null){
        this._productService.getProductsByVendor(this.selectedMenu)
       .subscribe(products => this.productList.productByDepts = products);
    }
    //When filtering only by Side menu
    else if(this.selectedSideMenu != null && this.selectedMenu == null){
        this._productService.getProductsByDept(this.selectedSideMenu )
       .subscribe(products => this.productList.productByDepts = products);
    }
}
ChangeCountry(country):void{
    sessionStorage["countryCode"] = country;
    window.location.reload();
}
  
}



//'http://localhost:3000/api/v1/Departments'