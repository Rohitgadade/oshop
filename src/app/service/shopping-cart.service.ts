import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private http: HttpClient) {}

  create() {
    this.http
      .post(
        'https://oshop-efaad-default-rtdb.asia-southeast1.firebasedatabase.app/oshop/shopping-list.json',
        { createdDate: new Date().getTime() }
      )
      .subscribe({
        next: (item: any) => {
          let value = Object.keys(item).map((key) => item[key]);
          localStorage.setItem('cartId', value.join(''));
        },
      });
  }

  getOrCreateId() {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      this.create();
      return;
    } else {
      return cartId;
    }
  }

  addToCart(product: Product, quantity: number) {
    let cartId = this.getOrCreateId();
    this.http
      .put(
        'https://oshop-efaad-default-rtdb.asia-southeast1.firebasedatabase.app/oshop/shopping-list/' +
          cartId +
          '/item/' +
          product.productId +
          '/.json',
        { product: product, quantity: quantity }
      )
      .subscribe();
  }

  getCart() {
    return this.http
      .get<[]>(
        'https://oshop-efaad-default-rtdb.asia-southeast1.firebasedatabase.app/oshop/shopping-list.json'
      )
      .pipe(
        map((responseData) => {
          const categoryArray: [] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              categoryArray.push(responseData[key]);
            }
          }
          return categoryArray;
        })
      );
  }
}
