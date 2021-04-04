import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { Storage } from "@ionic/storage-angular";

const BASE_URI = 'auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private requestService: RequestService,
              private storage: Storage
              ) {
  }

  //login
  async signin(user) : Promise<any>{
    let uri = BASE_URI +'login/';
    return await this.post(uri, user, "Autenticando...");
  }

  private async post(url, body, message) {   
    let result;

    try {
      result = await this.requestService.post(url, body, message);
      this.storage.set('userToken', result.token);
    } catch (error) {
      throw(error);
    }     

    return result;
  }  
 
}
