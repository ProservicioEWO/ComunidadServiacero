import { ApiService } from '../services/api.service';
import { Component } from '@angular/core';
import { Event } from '../models';
import { Observable } from 'rxjs';
import { S3Service } from '../services/s3.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.html',
  styleUrls: ['./galeria.css'],
})
export class Galeria {
  video$: Observable<string>
  events$: Observable<Event[]>

  constructor(private api: ApiService, private s3: S3Service) { }

  ngOnInit() {
    this.events$ = this.api.getEvents()
    this.video$ = this.s3.getObject('videos/ComunidaServiacero_General.mp4')
  }
}
