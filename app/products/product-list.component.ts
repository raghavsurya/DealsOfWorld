//Directive Component
import { Component, OnInit } from 'angular2/core'
import { Http, HTTP_PROVIDERS } from 'angular2/http'
import 'rxjs/Rx';
import { IProductsByDept } from '../Interfaces/productByDepts'
import {ProductFilterPipe} from '../pipes/productFilter'
import { StarComponent } from '../stars/star.component';
import {ProductService} from '../services/productService'
import {Observable} from 'rxjs/Observable'

@Component({
    selector : 'dw-products',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'app/products/product-list.component.html',
    pipes: [ProductFilterPipe],
     directives: [StarComponent]
})


export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    headerOfPanel: string = 'Deals of the world. ';
    listFilter: string = "";
    errorMessage: string;
     productByDepts: IProductsByDept[];

     constructor(private _productService: ProductService){
   
     }
    
   ngOnInit(): void {
  this._productService.getProducts()
       .subscribe(products => this.productByDepts = products,
       error => this.errorMessage = <any>error);
   }
       onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}