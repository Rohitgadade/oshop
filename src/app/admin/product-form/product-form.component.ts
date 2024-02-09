import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../models/Category.model';
import { Product } from '../../models/Product.model';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { ProductService } from '../../service/product.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    LoaderComponent,
    ProductCardComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  @ViewChild('f')
  form!: NgForm;
  products = {
    title: '',
    price: 0,
    category: '',
    imageUrl: '',
  };
  categories: Category[] = [];

  reg: RegExp =
    /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png|bmp)$/i; //image url validation regex expression

  isEditMode: boolean = false;
  editItemId!: string;
  isLoading: boolean = true;

  constructor(
    private productSerivce: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    productSerivce.getCategories().subscribe((cat: Category[]) => {
      this.categories = cat;
      console.log('cat', cat);
      console.log('categ', this.categories);
    });
  }

  ngOnInit() {
    this.editItemId = this.route.snapshot.params['id'];
    if (this.editItemId) {
      this.productSerivce.getProductById(this.editItemId).subscribe({
        next: (data: Product) => {
          // this.products = data;
          this.products.title = data.title;
          this.products.price = data.price;
          this.products.category = data.category;
          this.products.imageUrl = data.imageUrl;
          console.log(data);
          this.isEditMode = true;
          // this.form.setValue({
          //   title: this.products.title,
          //   price: this.products.price,
          //   category: this.products.category,
          //   imageUrl: this.products.imageUrl,
          // });
        },
      });
    }
  }

  save() {
    if (this.isEditMode) {
      this.productSerivce
        .updateProduct(this.editItemId, this.form.value)
        .subscribe({
          next: () => {
            this.productSerivce.getProducts();
            this.router.navigate(['/admin/products']);
          },
          complete: () => {
            this.form.reset();
            this.isEditMode = false;
          },
        });
    } else {
      this.productSerivce.storeProduct(this.form.value).subscribe({
        next: () => {
          this.productSerivce.getProducts();
          this.router.navigate(['/admin/products']);
        },
        complete: () => {
          this.form.reset();
          this.isEditMode = false;
        },
      });
    }
  }
  delete() {
    if (confirm('Are you sure you want to delete this product ?')) {
      this.productSerivce.deleteProduct(this.editItemId).subscribe({
        next: () => {
          this.productSerivce.getProducts();
          this.router.navigate(['/admin/products']);
        },
      });
    }
  }
}
