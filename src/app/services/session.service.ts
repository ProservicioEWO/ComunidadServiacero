import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookie: CookieService) { }

  currentUser() {
    return this.cookie.get(`user-token`)
  }

  setUser(userId: string | undefined) {
    if (userId) {
      this.cookie.set(`user-token`, JSON.stringify({
        id: userId.toString()
      }))
    }
  }

  logout() {
    this.cookie.delete('user-token')
  }
}