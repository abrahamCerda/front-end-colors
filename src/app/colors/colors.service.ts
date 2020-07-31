import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {ErrorHandler} from '../utils/ErrorHandler';
import {ColorsList} from './colors-list';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private readonly FIND_ALL_ENDPOINT;

  constructor(private readonly httpClient: HttpClient) {
    this.FIND_ALL_ENDPOINT = `${environment.apiUrl}/colors`;
  }

  getColors(page: number, pageSize: number): Observable<ColorsList> {
    const url = `${this.FIND_ALL_ENDPOINT}?page=${page}&pageSize=${pageSize}`;
    return this.httpClient.get<ColorsList>(url)
      .pipe(
        catchError(ErrorHandler.handleError)
      );
  }
}
