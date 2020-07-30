import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginResponse} from './login-response';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly LOGIN_ENDPOINT;

  constructor(private readonly httpClient: HttpClient) {
    this.LOGIN_ENDPOINT = `${environment.apiUrl}/auth/login`;
  }

  login(email: string, password: string, rememberMe: boolean): Observable<LoginResponse>{
    const body = {
      email,
      password,
    };
    return this.httpClient.post<LoginResponse>(this.LOGIN_ENDPOINT, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
