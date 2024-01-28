import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../service/product.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [RouterModule, CommonModule, LoaderComponent, NgbPagination,FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  allProducts: Product[] = [];
  subscription!: Subscription;
  loading: boolean = false;

  page = 1;
  pageSize = 4;
  collectionSize: number = 0;

  constructor(private productSerivce: ProductService) {}

  ngOnInit() {
    this.loading = true;
    this.subscription = this.productSerivce.getProducts().subscribe({
      next: (data: Product[]) => {
        this.collectionSize = data.length;
        this.products = data;
        this.allProducts = this.products;
      },
      complete: () => {
        this.refreshProducts();
        this.loading = false;
      },
    });
  }

  filter(query: any) {
    this.products = query
      ? this.allProducts.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.allProducts;
    this.collectionSize = this.products.length;
    if(query ==''){
      this.refreshProducts()
    }
  }

  refreshProducts() {
    this.products = this.allProducts.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
