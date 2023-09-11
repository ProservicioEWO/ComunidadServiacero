import { Component, OnInit } from '@angular/core';
import { CheckSessionService } from '../services/check-session.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStatus } from '../utils/SessionStatus';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  $destroy = new Subject()

  constructor(private checkSession: CheckSessionService, private router: Router) { }

  ngOnInit(): void {
    this.checkSession.run()
      .pipe(
        takeUntil(this.$destroy)
      ).subscribe({
        next: (status) => {
          if (status === SessionStatus.INVALID_SESSION) {
            this.router.navigate(["/login"])
          }
        },
        error: console.log
      })
  }
}
