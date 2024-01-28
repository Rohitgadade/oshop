import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products:Product[]=[];

 constructor( productService:ProductService){
  productService.getProducts().subscribe({
    next:(data)=>{
      this.products=data
    }
  })
 }

}
