import { Component, OnInit } from '@angular/core';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Observable, map, switchMap } from 'rxjs';
import { News } from 'src/app/models/News';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  news$: Observable<News[]>
  idToken: string

  constructor(private api: ApiService, private auth: AuthService) {
    this.auth.idToken.then(value => this.idToken = value)
  }

  ngOnInit() {
    const s3Client = new S3Client({
      region: 'us-east-1',
      credentials: fromCognitoIdentityPool({
        identityPoolId: 'us-east-1:80f0cb2c-4696-40d1-abad-db84a85d70d4',
        clientConfig: {
          region: 'us-east-1'
        },
        logins: {
          "cognito-idp.us-east-1.amazonaws.com/us-east-1_oud83NQk8": this.idToken
        }
      })
    })

    this.news$ = this.api.getLatestNews().pipe(switchMap(arr => (
      Promise.all(arr.map(async e => ({
        ...e,
        image: await getSignedUrl(s3Client, new GetObjectCommand({
          Bucket: 'cs-static-res',
          Key: `images/news/${e.image}`
        }))
      })))
    )))
  }
}
