import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit {

  private store;
  private win: any = window;    

  constructor(private popCtrl  : PopoverController,
              private file     : File,
              private transfer : FileTransfer,
              private navParams: NavParams,
              private camera   : Camera) {
    
    this.store = this.navParams.get('store');
    this.file.createDir(this.file.dataDirectory, 'store', true).then(_ => console.log('Created!!')).catch(err => console.log('Erro: ' + err));
  }

  ngOnInit() {}

  private openCamera(){
    this.takePicture(this.camera.PictureSourceType.CAMERA);
  }
  
  private openGallery(){
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  private takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // let loading;
    // loading =  this.loadingCtrl.create({
    //   content: 'Carregando imagem...'
    // });
    // loading.present();

    this.camera.getPicture(options).then((imageData) => {
      console.log('imageData');
      console.log(imageData);
      let fileName = this.createFileName();
      this.store.image = {src: this.win.Ionic.WebView.convertFileSrc(imageData), name: fileName}; 
      this.upload(imageData, fileName);      
      
      // loading.dismiss();
    }, (err) => {
      console.log(err);
      // this.presentToast('Error while selecting image.');
      // loading.dismiss();
    });

    this.close();
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
    return newFileName;
  }
  
  private upload(fileSrc, fileName) {   

    var options = {
      fileKey: "image",
      fileName: fileName,
      chunkedMode: false,
      mimeType: "multipart/form-data",
    };
   
    const fileTransfer: FileTransferObject = this.transfer.create();
   
    // this.loading = this.loadingCtrl.create({
    //   content: 'Uploading...',
    // });
    // this.loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(fileSrc, environment.urlServer + 'test/upload', options).then(data => {
      console.log(data);
      console.log(JSON.parse(data.response));
      // this.loading.dismissAll()
    }, err => {
      console.log(err);
      // this.loading.dismissAll()
    });
  }

  close() {
    console.log("close");
    this.popCtrl.dismiss();
  }

}
