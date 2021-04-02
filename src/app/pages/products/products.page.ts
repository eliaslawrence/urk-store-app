import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  status = "available";
  products: Array<any>;

  constructor() { 
    this.products = this.getProducts();
  }

  ngOnInit() {
  }

  private getProducts() {

    //TODO: get store from DB (1)
    let products = [
      { productName: 'Bolo de Chocolate XYZ', code: '000054578/001', date: '2 de maio às 12:24', price: 5.99, qty: 200, unity: 'u', available: true , hasStock: false, description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "https://www.tvgazeta.com.br/wp-content/uploads/2017/12/bolo.pelo_.amor_.YT_-1024x709.jpg"}, {src: "http://192.168.25.4:8887/volley.png"}]},
      { productName: 'Pastel de Queijo'     , code: '157054578/002', date: '3 de maio às 22:55', price: 5.99, qty: 200, unity: 'u', available: false, hasStock: false, description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "assets/imgs/cake.jpg", name: "cake.jpg"}]},
      { productName: 'Bolo de Chocolate X'  , code: '000054578/001', date: '2 de maio às 12:24', price: 5.99, qty: 200, unity: 'u', available: false, hasStock: false, description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg", name: "cake.jpg"}]},
      { productName: 'Torta'                , code: '157054578/002', date: '3 de maio às 22:55', price: 5.99, qty: 200, unity: 'u', available: true , hasStock: false, description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: []},
      { productName: 'Coxinha'              , code: '000054578/001', date: '2 de maio às 12:24', price: 5.99, qty: 200, unity: 'u', available: true , hasStock: false, description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "assets/imgs/cake.jpg", name: "cake.jpg"}]},
      { productName: 'Pizza de Calabresa'   , code: '157054578/002', date: '3 de maio às 22:55', price: 5.99, qty: 200, unity: 'u', available: true , hasStock: false, description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg", name: "cake.jpg"}]},
      { productName: 'Pizza de Mussarela'   , code: '000054578/001', date: '2 de maio às 12:24', price: 5.99, qty: 200, unity: 'u', available: false, hasStock: false, description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg", name: "cake.jpg"}]},
      { productName: 'Pizza 4 Queijos'      , code: '157054578/002', date: '3 de maio às 22:55', price: 5.99, qty: 200, unity: 'u', available: false, hasStock: false, description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "assets/imgs/cake.jpg", name: "cake.jpg"}]},
      { productName: 'Empadinha'            , code: '000054578/001', date: '2 de maio às 12:24', price: 5.99, qty: 0, unity: 'u', available: true , hasStock: false, description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "assets/imgs/cake.jpg", name: "cake.jpg"}]},
    ];
    ///////////////////////////////////////////////////////////END (1)

    return products;
  }

}
