import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { S3Service } from 'src/app/services/s3.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  images$: Observable<string[]>

  constructor(private s3: S3Service) {}
  
  ngOnInit() {
    (async () => {
      this.images$ = await this.s3.getObjects('images/banner/')
    })()
  }
}
