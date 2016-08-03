import { ProductListComponent } from '../products/product-list.component';


export const DealsAppRoutes = [
  { path: '', component: ProductListComponent },
  { path: '/:brand/:category', component: ProductListComponent },
   { path: '/:brand', component: ProductListComponent }
];