import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Subject, takeUntil } from 'rxjs';
import AuthFailureError from '../errors/AuthFailureError';
import { Event } from '../models';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { State } from '../utils/State';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.html',
  styleUrls: ['./galeria.css'],
})
export class Galeria {
  private unsubscribe$ = new Subject<void>()
  private idToken: string | null = null

  eventsState = {
    data: null,
    error: null,
    loading: true
  } as State<Event[]>

  videoState = {
    data: null,
    error: null,
    loading: true
  } as State<string>

  constructor(private route: ActivatedRoute, private api: ApiService, private auth: AuthService) {
    this.auth.idToken.then(value => {
      this.idToken = value
    })
  }

  ngOnInit() {
    if (!this.idToken) {
      throw new AuthFailureError()
    }

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

    this.api.getEvents()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (data) => this.eventsState.data = data,
        error: (err) => this.eventsState.error = err,
        complete: () => {
          this.eventsState.loading = false
        }
      })

    getSignedUrl(s3Client, new GetObjectCommand({
      Bucket: 'cs-static-res',
      Key: 'videos/ComunidaServiacero_General.mp4'
    }), { expiresIn: 300 })
      .then(data => this.videoState.data = data)
      .catch(err => this.videoState.error = err)
      .finally(() => this.videoState.loading = false)
  }
}
