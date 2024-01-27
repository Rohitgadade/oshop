import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  storeProduct(product: Product) {
    return this._http.post<Product>(
      'https://oshop-7595d-default-rtdb.firebaseio.com/products.json',
      product
    );
  }

  getProducts(){
    return this._http
      .get<Product[]>(
        'https://oshop-7595d-default-rtdb.firebaseio.com/products.json'
      )
      .pipe(
        map((responseData) => {
          const productArray: Product[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              productArray.push({ ...responseData[key], productId: key });
            }
          }
          return productArray;
        })
      );
  }
  getProductById(productId: string) {
    return this._http.get<Product>(
      'https://oshop-7595d-default-rtdb.firebaseio.com/products/' +
        productId +
        '/.json'
    );
  }
  updateProduct(productId: string, product: Product) {
    return this._http.put<Product>(
      'https://oshop-7595d-default-rtdb.firebaseio.com/products/' +
        productId +
        '/.json',
      product
    );
  }
  deleteProduct(productId: string) {
    return this._http.delete<Product>(
      'https://oshop-7595d-default-rtdb.firebaseio.com/products/' +
        productId +
        '/.json'
    );
  }
}
