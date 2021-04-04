import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';

@Component({
  selector: 'app-edit-photos',
  templateUrl: './edit-photos.page.html',
  styleUrls: ['./edit-photos.page.scss'],
})
export class EditPhotosPage implements OnInit {

  private product          : any;
  private imgSelectedIndex : number = -1;

  constructor(private router : Router,
              private route  : ActivatedRoute,
              // private platform: Platform,
              // private requestProvider: RequestProvider,
              // private loadingCtrl: LoadingController,
              // private toastCtrl: ToastController,
              public popoverController: PopoverController
              ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {    
        this.product = this.router.getCurrentNavigation().extras.state.product;  
      }
    });

  }

  async addPhoto(){
    const popover = await this.popoverController.create({
      component: AddPhotoComponent,
      componentProps: {product: this.product},
      showBackdrop: true,
      cssClass: 'custom-popover'
    });    

    return await popover.present();    
  }

  private imageSelected(index){
    this.product.images[index].selected = !this.product.images[index].selected;
    if(this.imgSelectedIndex != -1){
      this.product.images[this.imgSelectedIndex].selected = false;
    }

    if(this.product.images[index].selected){
      this.imgSelectedIndex = index;
      // this.presentToast(this.product.images[index].src);
    }else{
      this.imgSelectedIndex = -1;
    }
  }
}
