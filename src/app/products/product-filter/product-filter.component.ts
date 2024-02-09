import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Category } from '../../models/Category.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.sass'
})
export class ProductFilterComponent {
  categories: Category[] = [];
  @Input('category') category!:string|null ;

  constructor(productService:ProductService){
    productService.getCategories().subscribe({
      next: (category: Category[]) => {
        this.categories = category;
      },
    });

  }

}
