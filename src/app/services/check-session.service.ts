import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SessionStatus } from '../utils/SessionStatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService {

  constructor(private auth: AuthService) { }

  run() {
    return new Observable<SessionStatus>((observer) => {
      setInterval(async () => {
        try {
          const isAuth = await this.auth.isAuthenticated()
          observer.next(
            !isAuth ?
              SessionStatus.INVALID_SESSION :
              SessionStatus.VALID_SESSION
          )
        } catch (err) {
          observer.error(err)
        }
      }, 1000)
    })
  }
}
