import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { data } from 'jquery';
import { Observable, Subject, forkJoin, map, switchMap, takeUntil } from 'rxjs';
import { Location } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { S3Service } from 'src/app/services/s3.service';

@Component({
  selector: 'app-instalaciones-detalles',
  templateUrl: './instalaciones-detalles.component.html',
  styleUrls: ['./instalaciones-detalles.component.scss']
})
export class InstalacionesDetalles implements OnInit {
  private destroy$ = new Subject<void>()

  locations$: Observable<NLocation[]>

  constructor(private route: ActivatedRoute, private api: ApiService, private s3: S3Service) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        let siteId = params.get("variable")
        if (siteId) {
          this.locations$ = this.api.getLocationsBySite(siteId).pipe(
            switchMap(arr => (
              forkJoin(
                arr.map<Observable<NLocation>>(
                  e => this.s3.getObject(e.imageKey).pipe(
                    map(imageUrl => ({
                      ...e,
                      imageUrl
                    }))
                  )
                )
              )
            ))
          )
        }
      })
  }
}

interface NLocation extends Location {
  imageUrl: string
}