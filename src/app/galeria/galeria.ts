import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.html',
  styleUrls: ['./galeria.css'],
})
export class Galeria {
  public href: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.href = this.router.url;

    if (this.href === '/galeria') {
      this.router.navigate(['/galeria/familia']);
      
    }
  }
}
