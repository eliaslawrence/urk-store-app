import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage-angular";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AuthenticateService } from './services/authenticate/authenticate.service';
import { Observable } from 'rxjs';

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

  user$ : Observable<any | null>;

  constructor(private storage : Storage,
              private splashScreen: SplashScreen,
              private auth      : AuthenticateService,
              private navCtrl : NavController) {           
    
    this.user$ = auth.watchProfile();

    this.storage.create().then(() => {
      this.storage.get('userToken').then((userToken) => {
        if(userToken){
          this.splashScreen.hide();
          console.log(userToken);
          this.navCtrl.navigateRoot('store');        
        }
      });
    });    
    
    // await this.storage.create();  

    // try {
    //   let userToken = await this.storage.get('userToken');
    //   if(userToken){
    //     this.navCtrl.navigateRoot('store');
    //       console.log(userToken);
    //     }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  logout(){    
    this.storage.remove("userToken");
    this.navCtrl.navigateRoot('');
  }
}
