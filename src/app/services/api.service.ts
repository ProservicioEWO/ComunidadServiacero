import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/Location';
import { City } from '../models/City';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = "https://njvggk237a.execute-api.us-east-1.amazonaws.com"

  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista de ciudades y sus respectivas instalaciones
   * @param accessToken Token de acceso
   * @returns Un Observable que contiene la lista de ciudades
   */
  getCities(accessToken: string) {
    return this.get<City[]>({
      endpoint: "/cities?_join=locations",
      accessToken
    })
  }

  /**
   * Obtiene una lista de instalaciones
   * @param accessToken Token de acceso
   * @returns Un Observable que contiene la lista de instalaciones
   */
  getLocations(accessToken: string) {
    return this.get<Location[]>({
      endpoint: "/locations",
      accessToken
    })
  }

  /**
   * Obtiene las instalaciones que pertenecen a una determinada ciudad
   * @param accessToken Token de acceso
   * @param cityId El ID de la ciudad a consultar
   * @returns Un Observable que contiene la lista de instalaciones
   */
  getLocationsByCity(accessToken: string, cityId: string) {
    return this.get<Location[]>({
      endpoint: `/cities/${cityId}/locations`,
      accessToken
    })
  }

  private get<T>({ endpoint, accessToken }: ApiOptions) {
    return this.http.get<T>(`${this.apiBaseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      }
    })
  }

}

interface ApiOptions {
  endpoint: string,
  accessToken: string
}