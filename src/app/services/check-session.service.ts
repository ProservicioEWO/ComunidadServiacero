import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SessionStatus } from '../utils/SessionStatus';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService {

  expire?: number

  constructor(private auth: AuthService) {
    this.auth.accessToken.then(token => {
      const payload = jwtDecode(token, { header: false }) as JwtPayload
      this.expire = payload.exp
    })
  }

  run() {
    return new Observable<SessionStatus>((observer) => {
      setInterval(async () => {
        try {
          if (this.expire) {
            console.log(this.expire)
            observer.next(
              this.expire <= this.getUNIX ?
                SessionStatus.INVALID_SESSION :
                SessionStatus.VALID_SESSION
            )
          }
        } catch (err) {
          observer.error(err)
        }
      }, 1000)
    })
  }

  /**
   * Obtiene la fecha actual en UNIX (segundos)
   */
  private get getUNIX() {
    return new Date().getTime() / 1000
  }
}
