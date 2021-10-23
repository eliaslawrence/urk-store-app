import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTelephonePageRoutingModule } from './edit-telephone-routing.module';

import { EditTelephonePage } from './edit-telephone.page';

import {NgxMaskModule} from 'ngx-mask'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    EditTelephonePageRoutingModule
  ],
  declarations: [EditTelephonePage]
})
export class EditTelephonePageModule {}
