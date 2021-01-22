import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = [];
  somePrice = 0;
  shippingPrice: number

  constructor() { }

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('productList'));
    console.log(this.products);
    if (!this.products[0]) {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(
          data => {
            this.products = data
            this.products.forEach(item => {
              item.price
              this.somePrice += item.price
              this.shippingPrice = this.products.length > 5 ? this.calcShippingPrice() : 2
              item.quantity = 1
            });
            localStorage.setItem('productList', JSON.stringify(this.products));
            this.somePrice = Math.round(this.somePrice)
          }
        )
    }
  }
  calcShippingPrice() {
    return this.products.length * 3
  }

  addItem(index) {
    this.products[index].quantity++
    localStorage.setItem('productList', JSON.stringify(this.products));
  }

  remove(index) {
    this.products.splice(index, 1);
    localStorage.setItem('productList', JSON.stringify(this.products));
  }

}
