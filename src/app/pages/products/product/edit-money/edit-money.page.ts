import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-money',
  templateUrl: './edit-money.page.html',
  styleUrls: ['./edit-money.page.scss'],
})
export class EditMoneyPage implements OnInit {

  productForm : FormGroup;
  submitAttempt: boolean;
  variableFocus: boolean;

  pageTitle: string;
  private name: string;
  isNumber: boolean;
  private productId: string;
  private variable : any;

  constructor(private route         : ActivatedRoute,
              private router        : Router,
              private navCtrl       : NavController, 
              private productService: ProductService,
              private formBuilder   : FormBuilder) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {    
        this.productId = this.router.getCurrentNavigation().extras.state.productId;    
        this.name      = this.router.getCurrentNavigation().extras.state.name;
        this.pageTitle = this.router.getCurrentNavigation().extras.state.pageTitle;
        this.variable  = this.router.getCurrentNavigation().extras.state.variable;

        this.productForm = this.formBuilder.group({      
          variable: [this.variable], //Validators.compose([Validators.required])],
        });

        if(this.productForm.value.variable && 
           this.productForm.value.variable !== '' && 
           !isNaN(this.productForm.value.variable)){

          this.isNumber = true;
        }
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
      await this.productService.updateAttribute(this.productId, variableJSON);
      this.navCtrl.pop();
    } catch (error) {
      console.error(error);
      console.log("N??o foi poss??vel carregar o feed principal");
    }   
  }

}
