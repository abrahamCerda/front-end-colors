import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  public storeData(key: string, object: {}): void{
    localStorage.setItem(key, JSON.stringify(object));
  }

  public getData(key: string): {}{
    return JSON.parse(localStorage.getItem(key));
  }

  public clearData(): void{
    localStorage.clear();
  }
}
