import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: '/home/Inbox', icon: 'home' },
    { title: 'Minha Loja', url: '/store', icon: 'storefront' },
    { title: 'Produtos', url: '/products', icon: 'grid' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
