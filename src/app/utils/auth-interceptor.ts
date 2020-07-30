import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StateService} from '../state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private readonly stateService: StateService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authData = this.stateService.getData('auth') as any;
    if (!authData || !authData.access_token){
      return next.handle(req);
    }
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authData.access_token}`),
    });
    return next.handle(authRequest);
  }
}
