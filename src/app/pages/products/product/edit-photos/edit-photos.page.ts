import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, LoadingController, ActionSheetController, ToastController, PopoverController } from '@ionic/angular';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

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
              // private camera: Camera,
              // private file: File,
              // private platform: Platform,
              // private requestProvider: RequestProvider,
              // private loadingCtrl: LoadingController,
              // private toastCtrl: ToastController,
              public popoverController: PopoverController,
              private transfer: FileTransfer
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

  save() {
    let imgToUpload = this.product.images[this.imgSelectedIndex];

    var options = {
      fileKey: "image",
      fileName: imgToUpload.name,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      // params : {'fileName': this.lastImage.name}
    };
   
    const fileTransfer: FileTransferObject = this.transfer.create();
   
    // this.loading = this.loadingCtrl.create({
    //   content: 'Uploading...',
    // });
    // this.loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(imgToUpload.src, 'http://192.168.15.5:1337/test/upload', options).then(data => {
      console.log(data);
      // this.loading.dismissAll()
    }, err => {
      console.log(err);
      // this.loading.dismissAll()
    });
  }
}
