import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';

const BASE_URI = 'telephone/';

@Injectable({
  providedIn: 'root'
})
export class TelephoneService {

  constructor(private requestService: RequestService) { }

  // CREATE
  create(storeID, newTelephone) : Promise<any>{
    let uri = BASE_URI + 'create/' + storeID;
    return this.requestService.post(uri, {newTelephone: newTelephone}, "Criando...");
  }

  // DELETE
  delete(telephoneId) : Promise<any>{
    let uri = BASE_URI + 'delete/' + telephoneId;
    return this.requestService.post(uri, {}, "Removendo...");
  }

  // Update
  updateAttribute(storeID, attributeJSON) : Promise<any>{
    let uri = BASE_URI + 'updateAttribute/' + storeID;
    return this.requestService.put(uri, attributeJSON, "Atualizando...");
  }
}
