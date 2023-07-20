import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { City } from '../models/City';
import { Component, OnInit } from '@angular/core';
import { Location } from '../models/Location';
import { Subject, takeUntil } from 'rxjs';
import AuthFailureError from '../errors/AuthFailureError';

@Component({
  selector: 'app-instalaciones',
  templateUrl: './instalaciones.html',
  styleUrls: ['./instalaciones.css'],
})
export class Instalaciones implements OnInit {
  private destroy$ = new Subject<void>()

  curentCity: string | null = null
  currentCityLocations: Location[] | null = null
  accessToken: string | null = null

  citiesState = {
    data: null,
    loading: true,
    error: null
  } as State<City[]>

  constructor(private route: ActivatedRoute, router: Router, private api: ApiService, private auth: AuthService) {
    this.auth.accessToken.then(value => {
      this.accessToken = value
    }).catch(err => {
      router.navigate(["/login"])
    })
  }

  get hasParam() {
    return !!this.route.snapshot.paramMap.keys.length
  }

  ngOnInit() {
    if (!this.accessToken) {
      throw new AuthFailureError()
    }

    this.api.getCities(this.accessToken)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cities) => this.citiesState.data = cities,
        error: (err) => this.citiesState.error = err,
        complete: () => {
          this.citiesState.loading = false
          this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe(params => {
              let cityId = params.get("variable")
              if (cityId && this.citiesState.data) {
                const city = this.citiesState.data.find(e => e.id === cityId)
                if (city) {
                  this.currentCityLocations = city.locations
                }
              }
            })
        }
      })

  }
}

interface State<T> {
  loading: boolean
  data: T | null
  error: string | null
}