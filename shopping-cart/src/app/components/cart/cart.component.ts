import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = [];
  somePrice = 0;

  constructor() { }

  ngOnInit() {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(
        data => {
          console.log(data);
          console.log(data[0].image);

          this.products = data
          this.products.forEach(item => {
            item.price
            this.somePrice += item.price
          });
        }
      )
  }

}
