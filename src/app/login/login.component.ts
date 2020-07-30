import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  rememberMe: boolean;

  constructor(private readonly loginService: LoginService) {}

  ngOnInit(): void {
  }

  onLogin(): void{
    if (!this.email || this.email === '' || !this.password || this.password === ''){
      return;
    }
    this.loginService.login(this.email, this.password, this.rememberMe)
      .subscribe(loginResponse => {
        /* Navegar a la siguiente pantalla*/
        console.log(loginResponse);
      }, error => {
        /* Que hacer en caso de error*/
        console.error(error);
      });
  }

}
