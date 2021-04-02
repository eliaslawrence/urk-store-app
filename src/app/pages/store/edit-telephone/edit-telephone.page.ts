import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-telephone',
  templateUrl: './edit-telephone.page.html',
  styleUrls: ['./edit-telephone.page.scss'],
})
export class EditTelephonePage implements OnInit {

  storeForm : FormGroup;
  submitAttempt: boolean;

  pageTitle: string;
  private name: string;
  isNumber: boolean;

  private index: number;
  newItem: boolean;
  itemFocus: boolean;

  private list;
  private storeId: string;

  constructor(private route         : ActivatedRoute,
              private router        : Router,
              public navCtrl        : NavController, 
              // private addressService: AddressService,
              // private storeService  : StoreService,
              private formBuilder   : FormBuilder) { 

  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {        
        this.name      = this.router.getCurrentNavigation().extras.state.name;
        this.pageTitle = this.router.getCurrentNavigation().extras.state.pageTitle;
        this.list      = this.router.getCurrentNavigation().extras.state.list;
        this.index     = this.router.getCurrentNavigation().extras.state.index;
        this.storeId   = this.router.getCurrentNavigation().extras.state.patientId;


        if(this.index >= 0){
          this.storeForm = this.formBuilder.group({      
            item: [this.list[this.index], Validators.compose([Validators.required])],
          });

          if(!isNaN(this.storeForm.value.item)){
            this.isNumber = true;
          }
        }else{
          this.newItem = true;

          this.storeForm = this.formBuilder.group({      
            item: ['', Validators.compose([Validators.required])],
          });
        }

        console.log(this.storeForm.value.item);
      }
    });        

  }

  deleteItem(){
    this.submitAttempt = true;

    let newList = [...this.list];
    newList.splice(this.index, 1);

    this.setVariable(newList);
  }

  saveItem(){
    this.submitAttempt = true;

    if(this.storeForm.controls.item.valid){      
      this.setItem(this.storeForm.value.item);
    }
  }

  private setItem(value){   
    let newList = [...this.list];

    if(this.newItem){
      newList.push(value);
    } else {
      newList[this.index] = value;
    }   

    this.setVariable(newList);
  }

  private setVariable(variable){
    this.save({[this.name]: variable});
  }

  private save(variableJSON){ 
    //TODO: request (conexao back-front)   
    // this.patientService.updateAttribute(this.storeId, variableJSON).then(() => {  
      console.log(variableJSON); 
      this.navCtrl.pop();
    // }, err => {
    //   console.log(err);
    //   console.log("Não foi possível carregar o feed principal");
    // });    
  }

}
