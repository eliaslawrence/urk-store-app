import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccountNamePageRoutingModule } from './edit-account-name-routing.module';

import { EditAccountNamePage } from './edit-account-name.page';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    EditAccountNamePageRoutingModule
  ],
  declarations: [EditAccountNamePage]
})
export class EditAccountNamePageModule {}
