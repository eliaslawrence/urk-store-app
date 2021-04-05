import { Component, Inject, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store/store.service';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  private store;

  constructor(private router           : Router,
              private storeService     : StoreService,
              private popoverController: PopoverController,) {
    // this.store = this.getStore();
  }

  ngOnInit() {    
    // this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.store = this.getStore();
  }

  ionViewWillEnter(){
    // this.store = this.getStore();//this.id);
  }

  private async getStore() {
    try {
      this.store = await this.storeService.findByUser();
      console.log(this.store);
    } catch (error) {
      console.error(error);
      console.log("Não foi possível carregar o feed principal");

      this.store = {
        image: {src: 'assets/imgs/loja.jpg', name: 'cover.jpg'},
        categories: [{name: 'Alimentos', code: '1'},
          {name: 'Variados' , code: '2'}],
        paymentOptions: [
          {name: 'Dinheiro', code: '2'},
          {name: 'Crédito' , code: '3'}
        ],
        storeType: {name: 'Pronta entrega', code: '1'},
        name: 'Lojinha do Sr. Raimundo',
        accountName: 'lojinhadoraimundo',
        telephones: [
          '21 22222222',
        ],
        daysOfTheWeek: [
          {name: 'Domingo', selected: false, openingHour: '08:00', closingHour: '16:00'},
          {name: 'Segunda', selected: true , openingHour: '08:00', closingHour: '16:00'},
          {name: 'Terça'  , selected: true , openingHour: '08:00', closingHour: '16:00'},
          {name: 'Quarta' , selected: false, openingHour: '08:00', closingHour: '16:00'},
          {name: 'Quinta' , selected: false, openingHour: '08:00', closingHour: '16:00'},
          {name: 'Sexta'  , selected: true , openingHour: '08:00', closingHour: '16:00'},
          {name: 'Sábado' , selected: false, openingHour: '08:00', closingHour: '16:00'}],
        address: {
            cep          : '24220380',
            address      : 'Rua Geraldo Martins',
            number       : '75',
            complement   : '403',
            neighborhood : 'Icaraí',
            city         : 'Niterói',
            state        : 'Rio de Janeiro',
            country      : 'Brasil',
            placeID      : ''
          }
      };
    }    
  }  

  private editItem(name, pageTitle, item = undefined) {
    let navigationExtras: NavigationExtras = {
      state : {
        conduct   : item,
        name      : name,
        pageTitle : pageTitle,
        patientId : this.store.id
      }      
    };
    
    this.router.navigate(['store/edit-item'], navigationExtras);
  }

  editAddress() {       
    let navigationExtras: NavigationExtras = {
      state : {
        address   : this.store.address,
        name      : 'address',
        pageTitle : 'Endereço',
        storeId   : this.store.id
      }      
    };
    
    this.router.navigate(['store/edit-address'], navigationExtras);
  }

  editTelephone(index) {    
    let navigationExtras: NavigationExtras = {
      state : {
        index     : index,
        list      : this.store.telephones,
        name      : 'telephones',
        pageTitle : 'Telefone',
        storeId   : this.store.id
      }      
    };
    
    this.router.navigate(['store/edit-telephone'], navigationExtras);
  }

  editVariable(name, pageTitle, variable, routingPage = 'edit-variable') {
    let navigationExtras: NavigationExtras = {
      state : {
        storeId   : this.store.id,
        name      : name     ,
        pageTitle : pageTitle,
        variable  : variable
      }
    };      
    
    this.router.navigate(['store/'+routingPage], navigationExtras);
  }

  async addPhoto(){
    const popover = await this.popoverController.create({
      component: AddPhotoComponent,
      componentProps: {store: this.store},
      showBackdrop: true,
      cssClass: 'custom-popover'
    });    

    return await popover.present();    
  }

}
