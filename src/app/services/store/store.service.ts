import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestService } from '../request/request.service';

const BASE_URI = 'store/';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private store: any = {};
  private storeSubject$ = new BehaviorSubject<any>(this.store);
  storeChanged$ = this.storeSubject$.asObservable();

  constructor(private requestService: RequestService) { }

  async findByUser() {    
    let uri = BASE_URI +'findByUser/';
    let store = await this.requestService.get(uri, {}, "Buscando...");
    this.store = store;
    this.storeSubject$.next(this.store);
    return store;
  }

  async updateAttribute(storeID, attributeJSON) : Promise<any>{
    let uri = BASE_URI + 'updateAttribute/' + storeID;
    let store = await this.requestService.put(uri, attributeJSON, "Atualizando...");
    this.store = store;
    this.storeSubject$.next(this.store);
    return this.requestService.put(uri, attributeJSON, "Atualizando...");
  }

  getImageURL(){
    return 'http://192.168.15.5:1337/image/findById/';
  }
}
