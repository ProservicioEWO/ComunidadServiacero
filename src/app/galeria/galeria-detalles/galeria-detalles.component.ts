import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { S3Service } from 'src/app/services/s3.service';

@Component({
  selector: 'app-galeria-detalles',
  templateUrl: './galeria-detalles.component.html',
  styleUrls: ['./galeria-detalles.component.scss']
})
export class GaleriaDetalles implements OnInit {

  images$: Observable<string[]>

  constructor(private route: ActivatedRoute, private s3: S3Service) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const eventId = params.get("variable")
      if (eventId) {
        this.images$ = await this.s3.getObjects(`images/gallery/${eventId}/`)
      }
    })
  }
}
