import { Component, Inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { CartItem } from './CartItem';
import { OrderService } from 'src/app/service/order.service';
import { OrderItemService } from 'src/app/service/order-item.service';
import { switchMap, map, concatMap, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  cartItems: any[] = [];
  maxOrderId!: number;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCartItems();
    this.getMaxOrderId();
  }

  getMaxOrderId(): void {
    this.orderService.getMaxOrderId().subscribe(
      (maxOrderId: number) => {
        this.maxOrderId = maxOrderId;
      },
      (error: any) => {
        console.error('Error fetching max order ID:', error);
      }
    );
  }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe(
      (items: any[]) => {
        this.cartItems = items;
        this.fetchProductDetails();
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  fetchProductDetails(): void {
    for (const item of this.cartItems) {
      this.productService.getProductById(item.productId).subscribe(
        (product: Product) => {
          item.productName = product.name;
          item.productImage = product.image;
          item.productPrice = product.price;
        },
        (error: any) => {
          console.error(`Error fetching product details for ID ${item.productId}:`, error);
        }
      );
    }
  }
  


  placeOrder(): void {
    this.orderService.createOrder().subscribe(
      (order: any) => {
        this.orderItemService.createOrderItems(this.cartItems, this.maxOrderId).subscribe(
          () => {
            this.cartService.clearCart().subscribe(
              () => {
                console.log('Order placed successfully');
                this.showOrderPlacedAlert();
                this.router.navigate(['/products']);
              },
              (error) => {
                console.error('Error clearing cart:', error);
              }
            );
          },
          (error) => {
            console.error('Error creating order items:', error);
          }
        );
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }

  showOrderPlacedAlert(): void {
    alert('Order has been placed!');
  }
  
}