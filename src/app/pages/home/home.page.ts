import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, MenuController, NavController, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { Storage } from "@ionic/storage-angular";
import { StatusBar } from '@ionic-native/status-bar/ngx'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  private user: any = {};
  private userForm : FormGroup;

  constructor(private activatedRoute   : ActivatedRoute,
              private formBuilder      : FormBuilder,
              private screenOrientation: ScreenOrientation,
              private platform         : Platform,
              private statusBar        : StatusBar,
              private menuCtrl         : MenuController,
              private navCtrl          : NavController,
              private alertController  : AlertController,
              private authService      : AuthenticateService) {  

    // this.initializeApp();

    this.menuCtrl.enable(false);

    // if(this.platform.is('android') || this.platform.is('iphone')) {
    //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    // }
                
    this.userForm = this.formBuilder.group({
      email:    ['', Validators.required],
      password: ['', Validators.required],
    });
  } 
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString("#ffffff");
    });
  }

  ngOnDestroy(){
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    
  }
  
  async login() {    
    // this.storage.set('name', 'Elias');

    try {
      let res = await this.authService.signin(this.user);
      console.log(res);
      this.navCtrl.navigateRoot('store');
    } catch (error) {
      this.presentAlert(undefined, undefined, error.error.data.message);
      console.log(error); 
    }
  }

  signup(){
    this.navCtrl.navigateForward('/signup');
  }

  async presentAlert(header, subheader, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: header,
      subHeader: subheader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);    
  }
  
}
