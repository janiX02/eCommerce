import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //storage: Storage = sessionStorage; //persists data in session tab
  storage: Storage = localStorage; // persists data regardless of session state (locally)

  constructor() {

    // read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItems = data;

      this.computeCartTotals();
    }
   }

  addToCart(cartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = cartItem;
    
    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      for (let tempCartItem of this.cartItems) {

        // check if we found it
        if (tempCartItem.id === cartItem.id) {
          existingCartItem = tempCartItem;
          alreadyExistsInCart = true;
          break;
        }
      }   
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(existingCartItem);
    }

    // compute the cart total price
    this.computeCartTotals();
    
  }
  computeCartTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subrcribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

    // persist cart data
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`total price: ${totalPriceValue.toFixed(2)}, total quantity: ${totalQuantityValue}`);
    console.log(`------`);
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.removeCartItem(cartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  removeCartItem(cartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === cartItem.id);

    // if found, remove the item from the array 
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
