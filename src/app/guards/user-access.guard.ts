import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccessGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth = await this.auth.isAuthenticated()

    if(!isAuth){
      this.router.navigate(["/login"])
      return false
    }

    return isAuth
  }

}
