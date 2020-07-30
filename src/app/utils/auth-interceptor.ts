import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StateService} from '../state.service';
import {finalize, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private readonly stateService: StateService,
              private readonly router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authData = this.stateService.getData('auth') as any;
    let authRequest;
    if (!authData || !authData.access_token){
      authRequest = req;
    }
    else {
        authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authData.access_token}`),
      });
    }
    let error: any;
    return next.handle(authRequest)
      .pipe(
        tap(
          event => {},
          err => error = err
        ),
        finalize(() => {
          console.log(error);
          if (error instanceof HttpErrorResponse && error.status === 401){
            this.stateService.clearData();
            this.router.navigateByUrl('/');
          }
        }),
      );
  }
}
