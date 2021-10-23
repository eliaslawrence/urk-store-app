import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorePage } from './store.page';

const routes: Routes = [
  {
    path: '',
    component: StorePage
  },
  {
    path: 'edit-variable',
    loadChildren: () => import('./edit-variable/edit-variable.module').then( m => m.EditVariablePageModule)
  },
  {
    path: 'edit-description',
    loadChildren: () => import('./edit-description/edit-description.module').then( m => m.EditDescriptionPageModule)
  },
  {
    path: 'edit-account-name',
    loadChildren: () => import('./edit-account-name/edit-account-name.module').then( m => m.EditAccountNamePageModule)
  },
  {
    path: 'edit-address',
    loadChildren: () => import('./edit-address/edit-address.module').then( m => m.EditAddressPageModule)
  },
  {
    path: 'edit-telephone',
    loadChildren: () => import('./edit-telephone/edit-telephone.module').then( m => m.EditTelephonePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePageRoutingModule {}
