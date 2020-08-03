import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {StateService} from '../state.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errors = {
    email: '',
    password: ''
  };

  constructor(private readonly loginService: LoginService,
              private readonly stateService: StateService,
              private readonly router: Router,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
  }

  onLogin(): void{
    console.log(this.password);
    console.log(this.email);
    this.errors.email = '';
    this.errors.password = '';
    if (!this.email || this.email === '' || !this.password || this.password === ''){
      if (!this.email || this.email === ''){
        this.errors.email = 'Debes ingresar tu correo';
      }
      if (!this.password || this.password === ''){
        this.errors.password = 'Debes ingresar tu contraseña';
      }
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
        this.toastr.error('Error al iniciar sesión', 'Error :(');
      });
  }

}
