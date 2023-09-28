import { Component, OnDestroy, OnInit } from '@angular/core';
import { CheckSessionService } from '../services/check-session.service';
import { Subscription } from 'rxjs';
import { SessionStatus } from '../utils/SessionStatus';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  checkSessionSubscription: Subscription

  modalVisible = false

  constructor(private checkSession: CheckSessionService) { }

  ngOnInit(): void {
    this.checkSessionSubscription = this.checkSession.run()
      .subscribe({
        next: (status) => {
          if (status === SessionStatus.INVALID_SESSION) {
            this.modalVisible = true
          }
        },
        error: console.log
      })
  }

  handleModalClick() {
    window.location.reload()
  }

  ngOnDestroy() {
    this.checkSessionSubscription.unsubscribe()
  }
}