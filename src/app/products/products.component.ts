import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  img: Chats[] = [
    {productName: "SCreditLine",image: "img1", description: "store credit line"},
    {productName: "KOKO",image: "img1", description: "credit card"},
    {productName: "Depot",image: "img1", description: "sfonds plan"},
    {productName: "Custome",image: "img1", description: "store customer"},
    {productName: "Credit Card",image: "img1", description: "store credit card"},
    {productName: "About Erste",image: "img1", description: "about erste"},
    {productName: "General",image: "img1", description: "general banking"}];

  

  doStuff(product){
    alert(product)
  }
}


interface Chats {
  productName: string;
  image: string;
  description: string;
}
