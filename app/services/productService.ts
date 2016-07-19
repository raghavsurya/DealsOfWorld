import { Component, OnInit, Injectable, Inject } from 'angular2/core'
import { Http, HTTP_PROVIDERS } from 'angular2/http'
import { IProductsByDept } from '../Interfaces/productByDepts'
import {Observable} from 'rxjs/Observable'
import {IDepartments} from '../Interfaces/Departments'

@Component({

})

@Injectable()
export class ProductService implements OnInit{
     countryCode: string;
    // rootVar: string = "us";
    constructor(private _http: Http, @Inject('rootVar') rootVar:string){
        this.countryCode = rootVar;
    }
    // constructor(private _http: Http){
    //     this.countryCode = this.rootVar;
    // }
    
getDeptLinks(startIndex: number){
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/GetAllSideMenus/' + this.countryCode) 
        
          .map(res => res.json())
           
       //   .do(data => console.log('Data returned: ' +JSON.stringify(data)))
   
       }

      getProducts(startIndex: number): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/Products/'+ startIndex + '/' + this.countryCode) 
        
          .map(res => <IProductsByDept[]>res.json())
           
       //   .do(data => console.log('Data returned: ' +JSON.stringify(data)))
   
       }
         getSubMenusByVendor(vendor: string):any{
               return this._http.get('http://DealsOfWorld.com:3000/api/v1/Menus/'+  this.countryCode + "/" + vendor) 
        
          .map(res => res.json())

}
       getProductsByVendor(page:number, mainMenu:string): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsByVendor/'+ page + "/" + this.countryCode + '/' + mainMenu) 
        
          .map(res => <IProductsByDept[]>res.json())
       }

        getProductsByVendorAndDept(page:number, mainMenu:string, department: string): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsByDeptByVendor/'+ page + "/" + this.countryCode + '/' + department + "/" + mainMenu) 
        
          .map(res => <IProductsByDept[]>res.json())
        }

         getProductsByDept(page:number, department:string): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsByDept/'+ page + "/" + this.countryCode + '/' + department) 
        
          .map(res => <IProductsByDept[]>res.json())
       }

        getProductsBySearchTerm(page:number, searchTerm:string): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsBySearchTerm/' + page + "/" + this.countryCode + '/' + searchTerm) 
        
          .map(res => <IProductsByDept[]>res.json())
       }
 

 ngOnInit(): void {
       console.log('In OnInit');
   }
}