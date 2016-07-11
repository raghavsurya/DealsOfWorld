//Container Component
import { Component, OnInit } from 'angular2/core'
import { ProductListComponent } from './products/product-list.component'
import { Http, HTTP_PROVIDERS } from 'angular2/http'
import 'rxjs/Rx'; //for map from http response & Load all features
import {IDepartments} from './Interfaces/Departments'
import {IProductType} from './Interfaces/Departments'

import {Observer} from 'rxjs/Observer';
import {ProductService} from './services/productService'


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
                 </div>
				<div style="padding-top:2%">
                <div class="searchSection">
                    <input type="text" placeholder="Search" [(ngModel)]="listFilter" />
                </div>
                <div class="menuLists">
                    <ul>
                        <li><button class="button button1"><span>Walmart</span></button></li>
                        <li><button class="button button1"><span>Macy's</span></button></li>
                        <li><button class="button button1"><span>Best Buy</span></button></li>
                        <li><button class="button button1"><span>Amazon</span></button></li>
                        <li><button class="button button1"><span>Extended Stay America</span></button></li>
                        <li><button class="button button1"><span>Sam's Club</span></button></li>
                        <li class="showMore"><button class="button moreButton"><span>More >></span></button></li>
                      
                    </ul>
                </div>
				</div>
            </div>
        </div>
		<div class="bodyWrapper">
        <div id="sideMenu" >
            <ul id="menu-v">
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Electronics </a></li>
                <li>
                    <a href="#"><span class="glyphicon glyphicon-tag"></span> Men</a>
                   
                </li>
                <li>
                    <a href="#"><span class="glyphicon glyphicon-tag"></span> Women</a>
                   
                </li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Food and Drink</a></li>
                <li>
                    <a href="#"><span class="glyphicon glyphicon-tag"></span> Shopping</a>
                   
                </li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Things to do</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Baby care and Toys</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span>  Cruise Travel</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Tour travel</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Home Improvement</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Home and Garden</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Automtive</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Resort and Travel</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Sports and Outdoor</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-tag"></span> Entertainment and Media</a></li>
            </ul>
			  
        </div>
		<div style="float:left;width:50%;">
			  <dw-products></dw-products>
			  </div>

			  
			  </div>
  
<div>

    `
    
})

export class AppComponent  {
  
    deptLinks: IDepartments[];
    
    pageTitle: string = 'Deals of World Application';
     constructor(http: Http){
            http.get('app/ppl.json').map(res => res.json())
    .subscribe(deptLinks => this.deptLinks = deptLinks) ;
    }
   getProdByType(id: number) : void {
       alert(id);
   }
}



//'http://localhost:3000/api/v1/Departments'