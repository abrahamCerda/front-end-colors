import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {ErrorHandler} from '../utils/ErrorHandler';
import {ColorsList} from './colors-list';
import {Color} from './color';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private readonly URL;

  constructor(private readonly httpClient: HttpClient) {
    this.URL = `${environment.apiUrl}/colors`;
  }

  public getColors(page: number, pageSize: number): Observable<ColorsList> {
    const endpoint = `${this.URL}?page=${page}&pageSize=${pageSize}`;
    return this.httpClient.get<ColorsList>(endpoint)
      .pipe(
        catchError(ErrorHandler.handleError)
      );
  }

  public createColor(color: Color): Observable<Color> {
    const endpoint = `${this.URL}`;
    return this.httpClient.post<Color>(endpoint, color)
      .pipe(
        catchError(ErrorHandler.handleError)
      );
  }

  public editColor(colorToEdit: Color): Observable<Color> {
    const endpoint = `${this.URL}/${colorToEdit.id}`;
    const {name, color, pantone, year} = colorToEdit;
    return this.httpClient.put<Color>(endpoint, {
      name, color, pantone, year
    })
      .pipe(
        catchError(ErrorHandler.handleError)
      );
  }

  public deleteColor(colorToDelete: Color): Observable<any> {
    const endpoint = `${this.URL}/${colorToDelete.id}`;
    return this.httpClient.delete<Color>(endpoint)
      .pipe(
        catchError(ErrorHandler.handleError)
      );
  }
}
