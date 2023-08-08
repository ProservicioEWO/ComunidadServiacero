import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  forkJoin,
  map,
  Observable,
  switchMap
} from 'rxjs';
import { News } from 'src/app/models/News';
import { S3Service } from 'src/app/services/s3.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  news$: Observable<News[]>
  idToken: string

  constructor(private api: ApiService, private auth: AuthService, private s3: S3Service) {
    this.auth.idToken.then(value => this.idToken = value)
  }

  ngOnInit() {
    this.news$ = this.api.getLatestNews().pipe(
      switchMap(arr => (
        forkJoin(
          arr.map<Observable<News>>(
            e => this.s3.getObject(`images/news/${e.image}`).pipe(
              map(imageUrl => ({
                ...e,
                image: imageUrl
              }))
            )
          )
        )
      ))
    )
  }
}
