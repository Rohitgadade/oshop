import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../service/product.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [RouterModule, CommonModule,LoaderComponent],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription!: Subscription;
  loading:boolean=false;
  constructor(private productSerivce: ProductService) {}

  ngOnInit() {
    this.loading=true;
    this.subscription = this.productSerivce.getProducts().subscribe({
      next: (data: Product[]) => {
        this.filteredProducts=this.products = data;
      },
      complete:()=>{
        this.loading=false
      }
    });
  }

  filter(query:any){
    this.filteredProducts=(query)?
    this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):
    this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
