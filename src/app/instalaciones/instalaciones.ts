import AuthFailureError from '../errors/AuthFailureError';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { City } from '../models';
import { Component, OnInit } from '@angular/core';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { S3Client } from '@aws-sdk/client-s3';
import { Observable, Subject, takeUntil } from 'rxjs';
import { S3Service } from '../services/s3.service';

@Component({
  selector: 'app-instalaciones',
  templateUrl: './instalaciones.html',
  styleUrls: ['./instalaciones.css'],
})
export class Instalaciones implements OnInit {
  cities$: Observable<City[]>

  curentCity: string | null = null

  constructor(private route: ActivatedRoute, private api: ApiService, private s3: S3Service) { }

  get hasParam() {
    return !!this.route.snapshot.paramMap.keys.length
  }

  ngOnInit() {
    this.cities$ = this.api.getCities()
  }
}

