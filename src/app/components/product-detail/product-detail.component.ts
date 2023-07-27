import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productData: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(Number(productId)).subscribe(
        product => this.productData = product
      );
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product.id).subscribe(
      response => {
        console.log('Item added to cart:', response);
      },
      error => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
}
