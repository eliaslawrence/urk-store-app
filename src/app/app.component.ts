import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Minha Loja', url: '/store', icon: 'storefront' },
    { title: 'Produtos', url: '/products', icon: 'grid' },
  ];

  constructor() {}
}
