import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/Product.model';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.sass',
})
export class ProductCardComponent implements OnInit,OnDestroy {
  @Input('product') product!: Product;
  @Input('showactions') showActions = true;
  subscription!:Subscription;
  // @Input('shoppingcart') shoppingCart: any;
  shoppingCart: any;
  // @Input('cartid') cartId: any;
  cartId: any;
  num = 1;
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
  }
  addToCart(product: Product) {
    console.log(product);
    this.shoppingCartService.addToCart(product, this.num++);
    this.getQuantity()
    
  }

  getQuantity() {
   this.subscription= this.shoppingCartService.getCart().subscribe({
      next: (cart: any) => {
        const data: any = cart[0]['item'];
        const temp: any = Object.entries(data);

        for (let i = 0; i < temp.length; i++) {
          if (this.product.productId === temp[i][0]) {
            let qty: any = temp[i][1];
            let ids: any = temp[i][0];
            this.shoppingCart = qty['quantity'];
            this.cartId = ids;
            console.log('q', temp[i][0]);
          }
        }
      },
    });
    return this.product.productId === this.cartId ? this.shoppingCart : '';
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
