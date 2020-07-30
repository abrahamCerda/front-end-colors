import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginResponse} from './login-response';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorHandler} from '../utils/ErrorHandler';

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
        catchError(ErrorHandler.handleError)
      );
  }
}
