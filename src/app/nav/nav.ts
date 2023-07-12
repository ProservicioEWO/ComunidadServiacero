import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "../services/session.service";

@Component({
selector: 'app-nav',
templateUrl: './nav.html',
styleUrls: ['./nav.css']
})

export class Nav{

  constructor(private session:SessionService, private router:Router){}

  logout(){
    this.session.logout()
    this.router.navigate(['/login'])
  }
}
