import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../models/Product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../service/product.service';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ProductFilterComponent } from './product-filter/product-filter.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    ProductFilterComponent,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: string | null;
  cart: any;
  cartId:any;

  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    private shoppingCasetService: ShoppingCartService
  ) {
    productService
      .getProducts()
      .pipe(
        switchMap((data) => {
          this.products = data;
          return route.queryParamMap;
        })
      )
      .subscribe({
        next: (param) => {
          this.category = param.get('category');
          this.filteredProducts = this.category
            ? this.products.filter((p) => p.category == this.category)
            : this.products;
        },
      });
  }
  ngOnInit() {
    // this.shoppingCasetService.getCart().subscribe({
    //   next: (cart: any) => {
    //     const data:any = cart[0]['item'];
    //     const temp:any = Object.entries(data);
    //     const id = this.products.map((el) => el.productId);
    //     for (let i = 0; i < temp.length; i++) {
    //       let productId = id.find((el) => el === temp[i][0]);
    //       if (productId) {
    //         let qty: any = temp[i][1];
    //         let ids: any = temp[i][0];
    //         this.cart = qty['quantity'];
    //         this.cartId = ids;
    //         console.log('q', temp[i][1]);
    //       }
    //     }
    //   },
    // })
  }
}
