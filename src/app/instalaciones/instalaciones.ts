import AuthFailureError from '../errors/AuthFailureError';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Subject, takeUntil } from 'rxjs';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Location, City } from '../models';
import { State } from '../utils/State';

@Component({
  selector: 'app-instalaciones',
  templateUrl: './instalaciones.html',
  styleUrls: ['./instalaciones.css'],
})
export class Instalaciones implements OnInit {
  private destroy$ = new Subject<void>()
  private idToken: string | null = null

  curentCity: string | null = null

  citiesState = {
    data: null,
    loading: true,
    error: null
  } as State<City[]>

  constructor(private route: ActivatedRoute, router: Router, private api: ApiService, private auth: AuthService) {
    this.auth.idToken.then(value => {
      this.idToken = value
    })
  }

  get hasParam() {
    return !!this.route.snapshot.paramMap.keys.length
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

    this.api.getCities()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cities) => this.citiesState.data = cities,
        error: (err) => this.citiesState.error = err,
        complete: () => this.citiesState.loading = false
      })
  }
}

interface NCity extends City {
  imgUrl: string
}