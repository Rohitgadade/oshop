import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  storeProduct(product: Product) {
    return this._http.post<Product>(
      'https://oshop-efaad-default-rtdb.asia-southeast1.firebasedatabase.app/oshop/products.json',
      product
    );
  }

  getProducts() {
    return this._http
      .get<Product[]>(
        'https://oshop-efaad-default-rtdb.asia-southeast1.firebasedatabase.app/oshop/products.json'
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
      'https://oshop-efaad-default-rtdb.asia-southeast1.firebasedatabase.app/oshop/products/' +
        productId +
        '/.json'
    );
  }
  updateProduct(productId: string, product: Product) {
    return this._http.put<Product>(
      'https://oshop-efaad-default-rtdb.asia-southeast1.firebasedatabase.app/oshop/products/' +
        productId +
        '/.json',
      product
    );
  }
  deleteProduct(productId: string) {
    return this._http.delete<Product>(
      'https://oshop-efaad-default-rtdb.asia-southeast1.firebasedatabase.app/oshop/products/' +
        productId +
        '/.json'
    );
  }
  getCategories() {
    return this._http
      .get<Category[]>(
        'https://oshop-efaad-default-rtdb.asia-southeast1.firebasedatabase.app/oshop/categories.json'
      )
      .pipe(
        map((responseData) => {
          const categoryArray: Category[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              categoryArray.push({ ...responseData[key],ids:key});
            }
          }
          return categoryArray;
        })
      );
  }
}
