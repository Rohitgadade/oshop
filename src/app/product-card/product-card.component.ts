import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../models/Product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.sass'
})
export class ProductCardComponent {

  @Input('product') product!:Product;
@Input('showactions') showActions=true;
}
