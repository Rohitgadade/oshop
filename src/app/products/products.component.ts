import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../models/Product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../service/product.service';
import { ProductFilterComponent } from './product-filter/product-filter.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterModule,NgOptimizedImage,ProductFilterComponent,ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!:string | null;

  constructor(productService: ProductService,route:ActivatedRoute) {
    
    productService.getProducts().pipe(
      switchMap((data)=>{
      this.products = data;
      return  route.queryParamMap;
      })
    ).subscribe({
      next:(param)=>{
        this.category=param.get('category')
        this.filteredProducts=this.category?
        this.products.filter((p)=>p.category==this.category):this.products
      }
    })

    // productService.getProducts().subscribe({
    //   next: (data) => {
    //     this.products = data;
    //   },
    // });

    

  }
}
