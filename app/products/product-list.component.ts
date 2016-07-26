//Directive Component
import {ChangeDetectionStrategy, Component, Input, OnInit } from 'angular2/core'
import { Http, HTTP_PROVIDERS } from 'angular2/http'
import 'rxjs/Rx';
import { IProductsByDept } from '../Interfaces/productByDepts'
import {ProductFilterPipe} from '../pipes/productFilter'
import { StarComponent } from '../stars/star.component';
import {ProductService} from '../services/productService'
import {Observable} from 'rxjs/Observable'
// import {PaginatePipe, PaginationControlsCmp} from 'ng2-pagination';
// import {PaginatePipe, PaginationService, PaginationControlsCmp, IPaginationInstance} from 'ng2-pagination';

@Component({
    selector : 'dw-products',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'app/products/product-list.component.html',
    pipes: [ProductFilterPipe],
     directives: [StarComponent],
 
})


export class ProductListComponent implements OnInit{
  showDropdown: boolean = true;
     private totalItems: number = 50;
    currentPage: number = 0;
     userselectedMenu: string;
  userselectedSideMenu: string;
    pageTitle: string = 'Product List';
    headerOfPanel: string = 'Deals of the world. ';
    listFilter: string = "";
    errorMessage: string;
    productByDepts: IProductsByDept[];
    methodName: string = "";
    searchStr: string = "";
    showLoader:boolean;
    test: IProductsByDept[];
    isSearch:boolean = false;
    showHeart:boolean = false;
    dealPercent: number ;
     constructor(private _productService: ProductService){
      //  this.userselectedMenu = selectedMenu;
     }
      
    
   ngOnInit(): void {
  this._productService.getProducts(0)
       .subscribe(products => this.productByDepts = products,
       error => this.errorMessage = <any>error);
   }
       onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    } 
    getNextSetOfProducts(page: number, userselectedMenu: string, userselectedSideMenu: string, searchString: string, methodName: string ): void{
       this.showLoader = true;
        this.currentPage = page;
        if(methodName == "getProductsByVendorAndDept"){
            this._productService.getProductsByVendorAndDept(page, userselectedMenu, userselectedSideMenu)
       .subscribe(products => this.productByDepts = this.productByDepts.concat(products),
       error => this.errorMessage = <any>error); 
        }
        else if(methodName == "getProductsByVendor"){
            this._productService.getProductsByVendor(page, userselectedMenu)
       .subscribe(products => this.productByDepts = this.productByDepts.concat(products),
       error => this.errorMessage = <any>error); 
        }
        else if(methodName == "getProductsByDept"){
            this._productService.getProductsByDept(page, userselectedSideMenu)
       .subscribe(products => this.productByDepts = this.productByDepts.concat(products),
       error => this.errorMessage = <any>error); 
        }
        else if(methodName == "getProductsBySearchTerm"){
            this._productService.getProductsBySearchTerm(page, searchString )
       .subscribe(products => this.productByDepts = this.productByDepts.concat(products),
       error => this.errorMessage = <any>error); 
        }
        else{
        this._productService.getProducts(page)
       .subscribe(products => this.productByDepts = this.productByDepts.concat(products),
       error => this.errorMessage = <any>error); 
        }
        this.showLoader = false;
           
   }

   SetSortOrder(sortTerm: string): void{
       
    //    this.productByDepts = this.productByDepts.sort((obj1: IProductsByDept, obj2: IProductsByDept =>{

    //    });
    //    );
    this.showDropdown = false;
 this.productByDepts = this.
 SortArray(this.productByDepts, sortTerm);
 if(sortTerm == "+") this.productByDepts = this.productByDepts.reverse();
   }
 SortArray<T extends IProductsByDept>(items: Array<T>, sortTerm: string): Array<T> {
    var vals = items.slice(3);
    vals.sort((a, b): number => {
        let leftOfferPrice: number = Number.parseInt(a.offerPrice.substring(1).split(".")[0])
         let rightOfferPrice: number = Number.parseInt(b.offerPrice.substring(1).split(".")[0])
        
        if (leftOfferPrice < rightOfferPrice) return -1;
         if (leftOfferPrice > rightOfferPrice) return 1;
        return 0;
         
         

    });

    return vals;

}
IsDealGood(actualPrice, offerPrice): boolean{
 let leftOfferPrice: number = Number.parseInt(offerPrice.substring(1).split(".")[0])
         let rightOfferPrice: number = Number.parseInt(actualPrice.substring(1).split(".")[0])
         if(leftOfferPrice && rightOfferPrice){
         if(100-((leftOfferPrice/rightOfferPrice) * 100) > 30){
                this.dealPercent = 100 - Math.round((leftOfferPrice/rightOfferPrice) *100);
                return true;
         }
         else{
              this.dealPercent = Math.round((leftOfferPrice/rightOfferPrice) *100);
                return false;
         } 
        }
        return false;
        
}
}