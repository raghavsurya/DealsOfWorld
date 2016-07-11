import { Component, OnInit, Injectable } from 'angular2/core'
import { Http, HTTP_PROVIDERS } from 'angular2/http'
import { IProductsByDept } from '../Interfaces/productByDepts'
import {Observable} from 'rxjs/Observable'

@Component({

})

@Injectable()
export class ProductService implements OnInit{
     
    constructor(private _http: Http){

    }
    
      getProducts(startIndex: number): Observable<IProductsByDept[]>{
          return this._http.get('http://DealsOfWorld.com:3000/api/v1/Products/'+ startIndex) 
        
          .map(res => <IProductsByDept[]>res.json())
           
       //   .do(data => console.log('Data returned: ' +JSON.stringify(data)))
   
       }
 

 ngOnInit(): void {
       console.log('In OnInit');
   }
}