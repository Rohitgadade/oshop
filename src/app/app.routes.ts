import { Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const routes: Routes = [
    {path:'',component:ProductsComponent},
    {path:'products',component:ProductsComponent},
    {path:'shopping-cart',component:ShoppingCartComponent},
    {path:'check-out',component:CheckOutComponent},
    {path:'order-success',component:OrderSuccessComponent},
    {path:'login',component:LoginComponent},
    {path:'my-orders',component:MyOrdersComponent},
    {path:'admin/products/new',component:ProductFormComponent},
    {path:'admin/products/:id',component:ProductFormComponent},
    {path:'admin/products',component:AdminProductsComponent},
    {path:'admin/orders',component:AdminOrdersComponent},
];
