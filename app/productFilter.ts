import {Pipe, PipeTransform} from 'angular2/core' 
import { IProductsByDept } from '../Interfaces/productByDepts'

@Pipe({
    name: 'productFilter'
})

export class ProductFilterPipe implements PipeTransform{
    transform(value: IProductsByDept[], args: string[]) : IProductsByDept[]{
        if(typeof value != 'undefined'){
        
        let filteredStr: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filteredStr ? value.filter((product: IProductsByDept) =>
        product.productText.toLocaleLowerCase().indexOf(filteredStr) != -1) : value;
        }
        return value;
        //return value;
        //If the filter value matches any product, this will filter the array otherwise return all products
    }
}