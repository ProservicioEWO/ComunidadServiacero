import AuthFailureError from '../errors/AuthFailureError';
import { AuthService } from './auth.service';
import { City } from '../models/City';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../models/Location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private apiBaseUrl = "https://njvggk237a.execute-api.us-east-1.amazonaws.com"

  constructor(private http: HttpClient) {}

  /**
   * Obtiene una lista de ciudades y sus respectivas instalaciones
   * @returns Un Observable que contiene la lista de ciudades
   */
  getCities() {
    return this.get<City[]>({
      endpoint: "/cities?_join=locations"
    })
  }

  /**
   * Obtiene una lista de instalaciones
   * @returns Un Observable que contiene la lista de instalaciones
   */
  getLocations() {
    return this.get<Location[]>({
      endpoint: "/locations"
    })
  }

  getEvents() {
    return this.get<Event[]>({
      endpoint: "/events"
    })
  }

  /**
   * Obtiene las instalaciones que pertenecen a una determinada ciudad
   * @param cityId El ID de la ciudad a consultar
   * @returns Un Observable que contiene la lista de instalaciones
   */
  getLocationsByCity(cityId: string) {
    return this.get<Location[]>({
      endpoint: `/cities/${cityId}/locations`
    })
  }

  private get<T>({ endpoint }: ApiOptions) {
    return this.http.get<T>(`${this.apiBaseUrl}${endpoint}`)
  }

}

interface ApiOptions {
  endpoint: string,
}