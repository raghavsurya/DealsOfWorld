export interface IDepartments{
    dept_id: number;
    productType:IProductType[];
    Department: string;
  
}

export interface IProductType{
    productTypeId: number;
    name: string;
    redirectUrl: string
}