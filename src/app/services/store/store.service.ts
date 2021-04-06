import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';

const BASE_URI = 'store/';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private requestService: RequestService) { }

  async findByUser() {
    let uri = BASE_URI +'findByUser/';
    return await this.requestService.get(uri, {}, "Buscando...");
  }

  async updateAttribute(storeID, attributeJSON) : Promise<any>{
    let uri = BASE_URI + 'updateAttribute/' + storeID;
    return this.requestService.put(uri, attributeJSON, "Atualizando...");
  }
}
