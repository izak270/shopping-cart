import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = [];
  somePrice: number;
  shippingPrice: number

  constructor() { }

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('productList'));
    if (!this.products[0]) {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(
          data => {
            this.products = data
            this.calculatePrices()

          }
        )
    } else {
      this.calculatePrices()
    }
  }

  calculatePrices() {
    this.somePrice = 0
    this.products.forEach(item => {
      if (!item.quantity) { item.quantity = 1 }
      this.somePrice += item.price * item.quantity
      this.shippingPrice = this.products.length > 4 ? this.calcShippingPrice() : 2
    });
    this.saveOnLocalStorage()
    this.somePrice = Math.round(this.somePrice)
  }

  calcShippingPrice() {
    return this.products.length * 3
  }

  addItem(index) {
    this.products[index].quantity++
    this.calculatePrices()
  }

  remove(index) {
    this.products.splice(index, 1);
    this.calculatePrices()
  }

  saveOnLocalStorage() {
    localStorage.setItem('productList', JSON.stringify(this.products));
  }
}
