import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-variable',
  templateUrl: './edit-variable.page.html',
  styleUrls: ['./edit-variable.page.scss'],
})
export class EditVariablePage implements OnInit {

  storeForm : FormGroup;
  submitAttempt: boolean;
  variableFocus: boolean;

  pageTitle: string;
  private name: string;
  isNumber: boolean;
  private storeId: string;
  private variable: any;

  constructor(private route         : ActivatedRoute,
              private router        : Router,
              private navCtrl       : NavController, 
              // private patientService: PatientService,
              private formBuilder   : FormBuilder) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {    
        this.storeId   = this.router.getCurrentNavigation().extras.state.patientId;    
        this.name      = this.router.getCurrentNavigation().extras.state.name;
        this.pageTitle = this.router.getCurrentNavigation().extras.state.pageTitle;
        this.variable  = this.router.getCurrentNavigation().extras.state.variable;

        this.storeForm = this.formBuilder.group({      
          variable: [this.variable], //Validators.compose([Validators.required])],
        });

        if(this.storeForm.value.variable && 
           this.storeForm.value.variable !== '' && 
           !isNaN(this.storeForm.value.variable)){

          this.isNumber = true;
        }
      }
    });

  }

  saveVariable(){
    this.submitAttempt = true;

    if(this.storeForm.controls.variable.valid){      
      this.setVariable(this.storeForm.value.variable);
    }
  }

  private setVariable(variable){
    this.save({[this.name]: variable});
  }

  private save(variableJSON){ 
    //TODO: request (conexao back-front)   
    // this.patientService.updateAttribute(this.storeId, variableJSON).then(() => {   
      this.navCtrl.pop();
    // }, err => {
    //   console.log(err);
    //   console.log("Não foi possível carregar o feed principal");
    // });    
  }

}