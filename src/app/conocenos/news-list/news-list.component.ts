import { Component, OnInit } from '@angular/core';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Observable, map, switchMap, forkJoin } from 'rxjs';
import { News } from 'src/app/models/News';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
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
          arr.map<Observable<News>>(e => {
            return this.s3.getImage(`images/news/${e.image}`).pipe(
              map(imageUrl => ({
                ...e,
                image: imageUrl
              }))
            )
          })
        )
      ))
    )
  }
}
