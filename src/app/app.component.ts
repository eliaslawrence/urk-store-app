import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from "@ionic/storage-angular";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AuthenticateService } from './services/authenticate/authenticate.service';
import { Observable, Subscription } from 'rxjs';
import { StoreService } from './services/store/store.service';
import { UserService } from './services/user/user.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx'

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

  
  private store:any;
  private storeChangedSubscription: Subscription;

  private user:any;
  private authChangedSubscription: Subscription;
  private userChangedSubscription: Subscription;

  constructor(private storage          : Storage,
              private splashScreen     : SplashScreen,
              private authService      : AuthenticateService,
              private userService      : UserService,
              private storeService     : StoreService,
              private platform         : Platform,
              private screenOrientation: ScreenOrientation,
              private statusBar        : StatusBar,
              private navCtrl          : NavController) {    
                
    this.initializeApp();

    if(this.platform.is('android') || this.platform.is('iphone')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    
    this.storeChangedSubscription = this.storeService.storeChanged$.subscribe((store)=>{
      this.store = store;
    });

    this.authChangedSubscription = this.authService.userChanged$.subscribe((user)=>{
      this.user = user;
    })

    this.userChangedSubscription = this.userService.userChanged$.subscribe((user)=>{
      this.user = user;
    })

    this.storage.create().then(() => {
      this.storage.get('userToken').then((userToken) => {
        if(userToken){
          this.splashScreen.hide();
          console.log(userToken);
          this.userService.getLoggedUser().then((user)=>{
            console.log(user);
            this.navCtrl.navigateRoot('store');    
          });              
        }
      });
    });  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString("#ffffff");
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){    
    this.storage.remove("userToken");
    this.navCtrl.navigateRoot('');
  }
}
