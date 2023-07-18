import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAccessGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    const isAuth = await this.auth.isAuthenticated()
    if (isAuth) {
      this.router.navigate(['/home'])
      return false
    }

    return true
  }

}
