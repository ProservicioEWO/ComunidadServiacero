import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAccessGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const isAuth = await this.auth.isAuthenticated()

      if (!isAuth) {
        throw new Error()
      }
    } catch (error) {
      this.router.navigate(["/login"])
      return false
    }

    return true
  }

}
