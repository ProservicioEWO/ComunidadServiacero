import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import values from './values';

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

  constructor(public auth: AuthService, private router: Router, private messageServicer: MessageService) {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    })
  }

  async login() {
    if (!this.loginForm.invalid) {
      try {
        const result = await this.auth.login(
          this.username.value ?? "",
          this.password.value ?? "",
        )
        console.log(result)
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
