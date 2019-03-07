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
  img: Chats[] = [{productName: "SCreditLine",image: "img1", description: "store credit line"},
  {productName: "KOKO",image: "img1", description: "credit card"},
  {productName: "Fonds Plan",image: "img1", description: "fonds plan"},
  {productName: "About Erste",image: "img1", description: "about erste related"},
  {productName: "General",image: "img1", description: "general banking query"}];
  

  doStuff(){
    alert("Card 1")
  }
}


interface Chats {
  productName: string;
  image: string;
  description: string;
}
