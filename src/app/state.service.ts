import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  storeData(key: string, object: {}): void{
    localStorage.setItem(key, JSON.stringify(object));
  }

  getData(key: string): {}{
    return JSON.parse(localStorage.getItem(key));
  }

  clearData(): void{
    localStorage.clear();
  }
}
