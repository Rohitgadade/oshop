import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Category } from '../../models/Category.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.sass',
})
export class ProductFilterComponent implements OnInit {
  categories: Category[] = [];
  @Input('category') category: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (category: Category[]) => {
        this.categories = category;
      },
    });
  }
}
