import { ApplicationInitStatus, Component } from '@angular/core'
import { User } from '../models/user'
import { LoginService } from '../services/login.service'
import { Router } from '@angular/router'
import { SessionService } from '../services/session.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = { alias: '', password: '' }

  values = [
    {
      img: '../../assets/Imagenes/login/icono2.png',
      txt: '<b>Educación</b> formal y oportunidades de formación.',
    },
    {
      img: '../../assets/Imagenes/login/icono3.png',
      txt: '<b>Responsabilidad</b> social y educación.',
    },
    {
      img: '../../assets/Imagenes/login/icono4.png',
      txt: '<b>Bienestar</b> familiar.',
    },
    {
      img: '../../assets/Imagenes/login/icono5.png',
      txt: '<b>Ambiente propicio</b> para la formación.',
    }
  ]

  constructor(private loginService: LoginService, private session: SessionService,private router: Router) {}

  ngOnInit() {}

  login() {
    try {

      if(!this.user.alias){
        alert("Introduce tu nombre de usuario por favor.")
        return
      }

      if(!this.user.password){
        alert("Introduce una contraseña por favor.")
        return
      }

      const loginSuccess = this.loginService.tryLogin(
        this.user.alias,
        this.user.password,
      )
      if (loginSuccess) {
        alert('¡Bienvenido!')
        this.session.setUser(this.user.alias)
        this.router.navigate(['/home'])
      } else {
        alert('Contraseña invalida')
      }
    } catch (error) {
      alert(error)
    }
  }
}
