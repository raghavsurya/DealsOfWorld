import { Component, OnInit, Injectable, Inject } from 'angular2/core'
import { Http, HTTP_PROVIDERS } from 'angular2/http'
import { IProductsByDept } from '../Interfaces/productByDepts'
import {Observable} from 'rxjs/Observable'

@Component({

})

@Injectable()
export class ProductService implements OnInit{
     countryCode: string;
    constructor(private _http: Http, @Inject('rootVar') rootVar:string){
        this.countryCode = rootVar;
    }
    
      getProducts(startIndex: number): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/Products/'+ startIndex + '/' + this.countryCode) 
        
          .map(res => <IProductsByDept[]>res.json())
           
       //   .do(data => console.log('Data returned: ' +JSON.stringify(data)))
   
       }

       getProductsByVendor(mainMenu:string): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsByVendor/'+ this.countryCode + '/' + mainMenu) 
        
          .map(res => <IProductsByDept[]>res.json())
       }

        getProductsByVendorAndDept(mainMenu:string, department: string): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsByDeptByVendor/'+ this.countryCode + '/' + department + "/" + mainMenu) 
        
          .map(res => <IProductsByDept[]>res.json())
        }

         getProductsByDept(department:string): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsByDept/'+ this.countryCode + '/' + department) 
        
          .map(res => <IProductsByDept[]>res.json())
       }

        getProductsBySearchTerm(searchTerm:string): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/ProductsBySearchTerm/'+ this.countryCode + '/' + searchTerm) 
        
          .map(res => <IProductsByDept[]>res.json())
       }
 

 ngOnInit(): void {
       console.log('In OnInit');
   }
}