import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/home/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/home/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/home/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/home/Archived', icon: 'archive' },
    { title: 'Trash', url: '/home/Trash', icon: 'trash' },
    { title: 'Spam', url: '/home/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
