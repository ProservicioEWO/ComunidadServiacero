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

  arra: any[] = []

  constructor(private s3: S3Service) {}
  
  ngOnInit() {
    this.images$ = this.s3.getImages('images/banner/')
  }

}
