import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  limit = 10;
  lastLength;
  searchText = undefined;
  searchAble : Boolean = false;
  status = "available";
  products: Array<any> = [];

  constructor(public navCtrl         : NavController,
              private productService : ProductService) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    // console.log("ionViewWillEnter");
    // console.log("ionViewWillEnter");
    // console.log("ionViewWillEnter");
    this.getProducts();
  }

  search(ev){
    // set val to the value of the searchbar
    this.searchText = ev.target.value.toLowerCase();
    this.getProducts();
  }

  async getProducts() {

    try {
      this.products = await this.productService.findByUser(this.limit,0,this.status == "available",this.searchText);
      console.log(this.products);  
      this.lastLength = this.products.length;          
    } catch (error) {
      console.error(error);
      console.log("Não foi possível carregar o feed principal");
    } 
  }

  itemTapped(id) {      
    this.navCtrl.navigateForward('products/product/' + id);
    // this.searchAble = false;
  }

  async newProduct() {
    try {
      let newProduct = await this.productService.createEmpty();
      this.itemTapped(newProduct.id);
      // this.products.push(newProduct);
      // this.lastLength = this.products.length;
    } catch (error) {
      console.error(error) ;
    }
  }

  private enableSearch() {      
    this.searchAble = true;
  }

  private cancel(){
    // Reset items back to all of the items
    this.searchText = undefined;
    this.getProducts();
    this.searchAble = false;
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      this.appendItems(this.limit);

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.products.length == this.lastLength) {
        console.log('No More Data');
        // event.target.disabled = true;
      }
    }, 500);
  }

  async appendItems(number) {
    try {
      let newProducts = await this.productService.findByUser(number,this.products.length,this.status == "available",this.searchText);
      this.products = this.products.concat(newProducts);          
    } catch (error) {
      console.error(error);
      console.log("Não foi possível carregar o feed principal");
    } 
  }

}
