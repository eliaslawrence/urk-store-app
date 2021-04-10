import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  private id     : string;
  private product: any = {images: [], code: '', name: '', description: '', cost: ''};

  url = 'http://192.168.15.5:1337/image/findById/';

  constructor(private route         : ActivatedRoute,
              private router        : Router,
              private productService: ProductService,
              private navCtrl       : NavController,
              public  menuCtrl      : MenuController) {    
    this.menuCtrl.enable(false);
  }
  
  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);    
  }

  ngOnDestroy(){
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter(){
    this.getProduct(this.id);
  }

  async getProduct(id: string){      
    try {
      // this.product = {
      //   name           : "Produto",
      //   cost           : 0.99,
      //   price          : 10.90,
      //   code           : "000000000/001",
      //   description    : "Produto Teste",
      //   quantity       : 1,
      //   categories     : [],
      //   paymentOptions : [],
      //   deliverOptions : [],
      //   images         : [{src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "assets/imgs/cake.jpg", name: "cake.jpg"}, {src: "assets/imgs/cake.jpg", name: "cake.jpg"}],
      //   stockControl   : false,
      //   salesAvailable : false,
      // };
      this.product = await this.productService.findById(id); 
      console.log(this.product);  
    } catch (error) {
      console.error(error);
      console.log("Não foi possível carregar o feed principal");
    }
  }

  editVariable(name, pageTitle, variable, routingPage = 'edit-variable') {
    let navigationExtras: NavigationExtras = {
      state : {
        productId : this.product.id,
        name      : name           ,
        pageTitle : pageTitle      ,
        variable  : variable
      }
    };      
    
    this.router.navigate(['products/product/' + this.product.id + '/' + routingPage], navigationExtras);
  }

  editPhotos() { 
    let navigationExtras: NavigationExtras = {
      state : {
        product  : this.product
      }
    }; 

    this.router.navigate(['products/product/' + this.product.id + '/edit-photos/'], navigationExtras);
  }

  private async availableToggled(available: boolean){
    try {
      await this.productService.updateAttribute(this.product.id, {available:available});

      let message;
      if(available){      
        message = 'Produto disponível para venda';
      }else{
        message = 'Produto indisponível para venda';
      }
      console.log(message);
      // this.presentToast(message);
    } catch (error) {
      this.product.available = !available;      
      console.error(error);
      console.log("Não foi possível carregar o feed principal");
    }
  }

  private async delete() {
    try {
      await this.productService.delete(this.product.id);
      this.navCtrl.navigateRoot('products');
    } catch (err) {
      console.log(err);
    }    
  }

}
