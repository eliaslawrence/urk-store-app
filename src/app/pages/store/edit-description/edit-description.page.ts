import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-edit-description',
  templateUrl: './edit-description.page.html',
  styleUrls: ['./edit-description.page.scss'],
})
export class EditDescriptionPage implements OnInit {
  productForm : FormGroup;
  submitAttempt: boolean;
  variableFocus: boolean;

  pageTitle: string;
  private name: string;
  isNumber: boolean;
  private storeId  : string;
  private variable : any;

  constructor(private route        : ActivatedRoute,
              private router       : Router,
              private navCtrl      : NavController, 
              private storeService : StoreService,
              private formBuilder  : FormBuilder) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {    
        this.storeId   = this.router.getCurrentNavigation().extras.state.storeId;    
        this.name      = this.router.getCurrentNavigation().extras.state.name;
        this.pageTitle = this.router.getCurrentNavigation().extras.state.pageTitle;
        this.variable  = this.router.getCurrentNavigation().extras.state.variable;

        if(!this.variable){
          this.variable = '';
        }

        this.productForm = this.formBuilder.group({      
          variable: [this.variable], //Validators.compose([Validators.required])],
        });
      }
    });

  }

  saveVariable(){
    this.submitAttempt = true;

    if(this.productForm.controls.variable.valid){      
      this.setVariable(this.productForm.value.variable);
    }
  }

  private setVariable(variable){
    this.save({[this.name]: variable});
  }

  private async save(variableJSON){ 
    try {
      await this.storeService.updateAttribute(this.storeId, variableJSON);
      this.navCtrl.pop();
    } catch (error) {
      console.error(error);
      console.log("Não foi possível carregar o feed principal");
    }   
  }
}
