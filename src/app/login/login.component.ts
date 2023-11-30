import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import values from './values';
import { ApiService } from '../services/api.service';
import { formatDate } from '@angular/common';
import { LogType } from '../models/Log';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  values = values

  loginForm: FormGroup
  username = new FormControl("", Validators.required)
  password = new FormControl("", Validators.required)

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private messageServicer: MessageService
  ) {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    })

    this.route.queryParams.subscribe(params => {
      const usr = params['usr'];
      const pwd = params['pwd'];
  
      // Verifica si los parámetros de la URL están presentes y asigna valores
      if (usr && pwd) {
        this.username.setValue(usr);
        this.password.setValue(pwd);
        
        this.login();
      }
    })

  }

  async login() {
    if (!this.loginForm.invalid) {
      try {
        const result = await this.auth.login(
          this.username.value!,
          this.password.value!,
        )
        const userId = await this.auth.userId
        this.api.postLog({
          date: formatDate(new Date(), "yyyy-MM-dd HH:mm:ss", "en-MX"),
          type: LogType.LOGIN,
          userId
        }).subscribe({
          error: (error) => console.log(error)
        })
        this.router.navigate(["/home"])
      } catch (error) {
        this.messageServicer.add({
          severity: "Error",
          summary: "¡Oh no!",
          detail: (error as Error).message,
        })
      }
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}
