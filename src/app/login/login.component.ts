import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import values from './values'
import { UserCredentials } from '../models/UserCredentials'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  values = values

  loginForm: FormGroup
  username = new FormControl("", Validators.required)
  password = new FormControl("", Validators.required)

  constructor(public auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    })
  }

  ngOnInit() { }

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
        if (error instanceof Error) {
          switch (error.name) {
            case 'NotAuthorizedException':
              alert("Las credenciales proporcionadas no son válidas o no están autorizadas para acceder.")
              break
            case 'UserNotFoundException':
              alert("No se encontró un usuario con la información proporcionada.")
              break
            case 'InvalidParameterException':
              alert("Se proporcionó un parámetro no válido en la solicitud.")
              break
            case 'UserNotConfirmedException':
              alert("El usuario aún no ha confirmado su cuenta. Por favor, verifica tu correo electrónico para confirmar la cuenta.")
              break
            case 'CodeMismatchException':
              alert("El código proporcionado no coincide con el código esperado. Por favor, verifica el código e inténtalo nuevamente.")
              break
            case 'PasswordResetRequiredException':
              alert("Es necesario restablecer la contraseña antes de poder autenticarse. Por favor, sigue las instrucciones para restablecer tu contraseña.")
              break
            default:
              alert("Ha ocurrido un error durante la autenticación. Por favor, intenta nuevamente más tarde.")
              break
          }
        }
      }
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}
