import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {StateService} from '../state.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private readonly loginService: LoginService,
              private readonly stateService: StateService,
              private readonly router: Router) {}

  ngOnInit(): void {
  }

  onLogin(): void{
    if (!this.email || this.email === '' || !this.password || this.password === ''){
      return;
    }
    this.loginService.login(this.email, this.password)
      .subscribe(loginResponse => {
        /* Navegar a la siguiente pantalla*/
        this.stateService.storeData('auth', loginResponse);
        this.router.navigateByUrl('colores');
      }, error => {
        /* Que hacer en caso de error*/
        console.error(error);
      });
  }

}
