import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../models/Category.model';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../service/product.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbModule, LoaderComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  @ViewChild('f')
  form!: NgForm;
  products!: Product;
  reg: RegExp =
    /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png|bmp)$/i; //image url validation regex expression
  isEditMode: boolean = false;
  editItemId!: string;
  isLoading: boolean = false;
  // categories = [
  //   { id: 1, name: 'Bread' },
  //   { id: 2, name: 'Dairy' },
  //   { id: 3, name: 'Fruits' },
  //   { id: 4, name: 'Seasonings and Spices' },
  //   { id: 5, name: 'Vegetables' },
  // ];

  categories!:Category;

  constructor(
    private productSerivce: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.editItemId = this.route.snapshot.params['id'];
    if (this.editItemId) {
      this.productSerivce.getProductById(this.editItemId).subscribe({
        next: (data: Product) => {
          this.products = data;
          this.isEditMode = true;
          this.form.setValue({
            title: this.products.title,
            price: this.products.price,
            category: this.products.category,
            imageUrl: this.products.imageUrl,
          });
        }
      });
    }
    this.productSerivce.getCategories().subscribe({
      next:(category:Category)=>{
        this.categories=category
      }
    })
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
