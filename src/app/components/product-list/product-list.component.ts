import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchKeyword = '';
  selectedCategory: string | null = 'All'; 

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = products;
      }
    );
  }

  search(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  filterByCategory(event: Event): void {
    const category = (event.target as HTMLSelectElement).value;
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.category === category
      );
    }
    this.selectedCategory = category;
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