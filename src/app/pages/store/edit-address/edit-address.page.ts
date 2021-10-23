import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address/address.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {

  storeForm : FormGroup;
  submitAttempt: boolean;

  pageTitle: string;
  private name: string;
  isNumber: boolean;

  private index: number;
  newItem: boolean;
  itemFocus: boolean;

  private address;
  private storeId: string;

  constructor(private route           : ActivatedRoute,
              private router          : Router,
              public navCtrl          : NavController, 
              private addressService  : AddressService,
              private alertController : AlertController,
              private formBuilder     : FormBuilder) { 

  }

  ngOnInit() {  
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {        
        this.name      = this.router.getCurrentNavigation().extras.state.name;
        this.pageTitle = this.router.getCurrentNavigation().extras.state.pageTitle;
        this.address   = this.router.getCurrentNavigation().extras.state.address;
        this.storeId   = this.router.getCurrentNavigation().extras.state.storeId;
        

        if(this.address){
          this.storeForm = this.formBuilder.group({      
            cep:          [this.address.cep,          Validators.compose([Validators.required])],
            address:      [this.address.address,      Validators.compose([Validators.required])],
            number:       [this.address.number,       Validators.compose([Validators.required])],
            complement:   [this.address.complement,   Validators.compose([Validators.required])],
            neighborhood: [this.address.neighborhood, Validators.compose([Validators.required])],
            city:         [this.address.city,         Validators.compose([Validators.required])],
            state:        [this.address.state,        Validators.compose([Validators.required])],
            country:      [this.address.country,      Validators.compose([Validators.required])],
          });

      // this.storeAddress.cep          = this.address['postal_code'];
      // this.storeAddress.address      = this.address['route'];
      // this.storeAddress.number       = this.address['street_number'];
      // this.storeAddress.complement   = this.address['complement'];
      // this.storeAddress.neighborhood = this.address['sublocality_level_1'];
      // this.storeAddress.city         = this.address['administrative_area_level_2'];
      // this.storeAddress.state        = this.address['administrative_area_level_1'];
      // this.storeAddress.country      = this.address['country'];
      // this.storeAddress.placeID      = storeAddress.place_id;
      
        }else{
          this.newItem = true;

          this.storeForm = this.formBuilder.group({      
            cep:          ['', Validators.compose([Validators.required])],
            address:      ['', Validators.compose([Validators.required])],
            number:       ['', Validators.compose([Validators.required])],
            complement:   [''],
            neighborhood: ['', Validators.compose([Validators.required])],
            city:         ['', Validators.compose([Validators.required])],
            state:        ['', Validators.compose([Validators.required])],
            country:      ['', Validators.compose([Validators.required])],
          });
        }
      }
    });         

  }

  saveItem(){
    this.submitAttempt = true;
    console.log(this.storeForm.value);

    if(this.storeForm.controls.cep.valid         &&
      this.storeForm.controls.address.valid      &&
      this.storeForm.controls.number.valid       &&
      this.storeForm.controls.neighborhood.valid &&
      this.storeForm.controls.city.valid         &&
      this.storeForm.controls.state.valid        &&
      this.storeForm.controls.country.valid){   

      this.setItem(this.storeForm.value);
      
    } else {
      console.error(this.getErrorMsg());
      this.errorAlert(this.getErrorMsg());
    }
  }

  private setItem(value){    
    if(this.newItem){
      this.add(value);
    } else {
      this.save(value);
    }   
  }

  private async add(newVariableJSON){    
    try {
      await this.addressService.create(this.storeId, newVariableJSON);
      this.navCtrl.pop();
    } catch (error) {
      console.log(error);
      console.log("Não foi possível carregar o feed principal");
    }     
  }

  private async save(variableJSON){    
    try {
      await this.addressService.updateAttribute(this.address.id, variableJSON);
      this.navCtrl.pop();
    } catch (error) {
      console.log(error);
      console.log("Não foi possível carregar o feed principal");
    }     
  }

  getErrorMsg(){
    const controls = this.storeForm.controls;      

    if(controls.cep.invalid){
      return "Campo CEP obrigatório"
    } else if (controls.address.invalid) {
      return "Campo Endereço obrigatório"
    } else if (controls.number.invalid) {
      return "Campo Número obrigatório"
    } else if (controls.neighborhood.invalid) {
      return "Campo Bairro obrigatório"
    } else if (controls.city.invalid) {
      return "Campo Cidade obrigatório"
    } else if (controls.state.invalid) {
      return "Campo Estado obrigatório"
    } else if (controls.country.invalid) {
      return "Campo País obrigatório"
    } else {
      return "Verifique os campos preenchidos"
    }
  }

  async errorAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      subHeader: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
