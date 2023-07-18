import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})

export class Nav {

  constructor(public auth: AuthService, private router: Router) { }

  async logout() {
    await this.auth.logout()
    this.router.navigate(["/login"])
  }
}
