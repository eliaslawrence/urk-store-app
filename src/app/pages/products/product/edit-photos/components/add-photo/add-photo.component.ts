import { Component, OnInit } from '@angular/core';
import { NavParams, Platform, PopoverController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

const TOKEN_KEY = 'userToken';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit {

  private product;
  private win: any = window;    

  constructor(private popCtrl  : PopoverController,
              private platform : Platform,
              private file     : File,
              private transfer : FileTransfer,
              private navParams: NavParams,
              private storage  : Storage,
              private camera   : Camera) {
    
    this.product = this.navParams.get('product');
    this.file.createDir(this.file.dataDirectory, 'product', true).then(_ => console.log('Created!!')).catch(err => console.log('Erro: ' + err));
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
      /*destinationType: this.camera.DestinationType.DATA_URL,*/
     /* destinationType: this.camera.DestinationType.FILE_URI,*/
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
      // this.product.images.push({src: this.win.Ionic.WebView.convertFileSrc(imageData), name: fileName}); 
      this.upload(imageData, fileName).then(() => {
        this.close();
      }); 

      // if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {


      //   let correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
      //   let currentName = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.lastIndexOf('?'));               
      //   // this.product.images.push({src: imageData, name: "teste.jpg"}); 
      //   // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      // } else {

      //   var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
      //   var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
      //   // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      // }
      
      // loading.dismiss();
    }, (err) => {
      console.log(err);
      // this.presentToast('Error while selecting image.');
      // loading.dismiss();
    });

    // this.close();
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log(this.file.dataDirectory);    
    this.file.removeRecursively(this.file.dataDirectory, 'product').then(data => {
      this.file.createDir(this.file.dataDirectory, 'product', true).then(_ =>

        this.file.copyFile(namePath, currentName, this.file.dataDirectory + 'product/', newFileName).then(success => {
          /*this.events.publish('storeImage:changed', newFileName, new Date().getTime());*/

          this.file.checkFile(this.file.dataDirectory + 'product/', newFileName).then((exists)=>{
            if(exists){
              this.product.images.push({src: this.win.Ionic.WebView.convertFileSrc(this.file.dataDirectory + 'product/' + newFileName), name: newFileName});
              this.product.images.push({src: this.file.dataDirectory + 'product/' + newFileName, name: newFileName});
              // this.imagesList.push({src: this.file.dataDirectory + 'product/' + newFileName, name: newFileName});
              // this.lastImage = {src: this.file.dataDirectory + 'product/' + newFileName, name: newFileName};
              console.log('filePath');
              console.log(this.file.dataDirectory + 'product/' + newFileName);
            }else{
              console.log("not exists");
            }
          }, err => {
            console.log('Error while checking file: ' + err);
          });
        }, err => {
          console.log('Error while storing file: ' + err);
          // this.presentToast('Error while storing file: ' + error);
        })
      ).catch(err => alert('Erro: ' + err));
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
    return newFileName;
  }
  
  private upload(fileSrc, fileName) : Promise<any> {   

    return this.storage.get(TOKEN_KEY).then((token) => {
      var options = {
        fileKey: "image",
        fileName: fileName,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        // params : {'productId': this.product.id},
        headers: {
          Authorization: `bearer ${token}`
        }
        // params : {'fileName': this.lastImage.name}
      };
    
      const fileTransfer: FileTransferObject = this.transfer.create();
    
      // this.loading = this.loadingCtrl.create({
      //   content: 'Uploading...',
      // });
      // this.loading.present();
    
      // Use the FileTransfer to upload the image
      fileTransfer.upload(fileSrc, environment.urlServer + 'product/addImage/' + this.product.id, options).then(data => {
        console.log(data);
        return data;
        // this.loading.dismissAll()
      }, err => {
        console.log(err);
        // this.loading.dismissAll()
      });
    });
  }

  close() {
    console.log("close");
    this.popCtrl.dismiss();
  }

}
