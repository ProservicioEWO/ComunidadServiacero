import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { data } from 'jquery';
import { Subject, takeUntil } from 'rxjs';
import { Location } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/utils/State';

@Component({
  selector: 'app-instalaciones-detalles',
  templateUrl: './instalaciones-detalles.component.html',
  styleUrls: ['./instalaciones-detalles.component.scss']
})
export class InstalacionesDetalles implements OnInit {
  private destroy$ = new Subject<void>()

  locationsState = {
    data: null,
    error: null,
    loading: false
  } as State<NLocation[]>

  constructor(private route: ActivatedRoute, private api: ApiService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.idToken.then(token => {
      const s3Client = new S3Client({
        region: 'us-east-1',
        credentials: fromCognitoIdentityPool({
          identityPoolId: 'us-east-1:80f0cb2c-4696-40d1-abad-db84a85d70d4',
          clientConfig: {
            region: 'us-east-1'
          },
          logins: {
            "cognito-idp.us-east-1.amazonaws.com/us-east-1_oud83NQk8": token
          }
        })
      })

      this.route.paramMap
        .pipe(takeUntil(this.destroy$))
        .subscribe(params => {
          let cityId = params.get("variable")
          if (cityId) {
            this.locationsState.loading = true
            this.api.getLocationsByCity(cityId).subscribe({
              next: (locs) => {
                Promise.all(
                  locs.map<Promise<NLocation>>(async e => {
                    const imgUrl = await getSignedUrl(s3Client,
                      new GetObjectCommand({
                        Bucket: 'cs-static-res',
                        Key: e.imageKey
                      }),
                      { expiresIn: 300 }
                    )
                    return { ...e, imgUrl }
                  })
                ).then(data => this.locationsState.data = data)
              },
              error: (err) => this.locationsState.error = err,
              complete: () => this.locationsState.loading = false
            })
          }
        })
    })
  }
}

interface NLocation extends Location {
  imgUrl: string
}