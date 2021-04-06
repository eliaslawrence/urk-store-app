import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { Storage } from "@ionic/storage-angular";
import { BehaviorSubject, Observable } from 'rxjs';

const BASE_URI = 'auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  user$ = new BehaviorSubject<any | null>(null);

  constructor(private requestService: RequestService,
              private storage: Storage
              ) {
  }

  watchProfile(): Observable<any> { 
    return this.user$; 
  }

  peekProfile(): any | null { 
    return this.user$.value; 
  }

  pokeProfile(user: any): void { 
    this.user$.next(user); 
  }

  //login
  async signin(user) : Promise<any>{
    let uri = BASE_URI +'login/';
    return await this.post(uri, user, "Autenticando...");
  }

  //signup
  async signup(newUser) : Promise<any>{
    let uri = BASE_URI +'signup/';      
    return await this.post(uri, newUser, "Criando cadastro...");
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
