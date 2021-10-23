import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAccountNamePage } from './edit-account-name.page';

const routes: Routes = [
  {
    path: '',
    component: EditAccountNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAccountNamePageRoutingModule {}
