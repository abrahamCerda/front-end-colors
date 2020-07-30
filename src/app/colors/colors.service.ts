import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Color} from './color';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {ErrorHandler} from '../utils/ErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private readonly FIND_ALL_ENDPOINT;

  constructor(private readonly httpClient: HttpClient) {
    this.FIND_ALL_ENDPOINT = `${environment.apiUrl}/colors`;
  }

  getColors(): Observable<Color[]> {
    return this.httpClient.get<Color[]>(this.FIND_ALL_ENDPOINT)
      .pipe(
        catchError(ErrorHandler.handleError)
      );
  }
}
