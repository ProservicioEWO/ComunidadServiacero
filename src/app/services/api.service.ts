import { City } from '../models/City';
import { Event } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../models/Location';
import { News } from '../models/News';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = "https://njvggk237a.execute-api.us-east-1.amazonaws.com"

  constructor(private http: HttpClient) { }

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

  /**
   * Obtiene una lista de eventos
   * @returns Un Observable que contiene la lista de eventos
   */
  getEvents() {
    return this.get<Event[]>({
      endpoint: "/events"
    })
  }

  /**
   * Obtiene una lista de programas
   * @returns Un Observable que contiene la lista de eventos
   */
  getPrograms() {
    return this.get<any[]>({
      endpoint: "/programs?_append=city"
    })
  }

  /**
   * Obtiene una lista de las ultimas noticias
   * @returns Un Observable que contiene la lista de las ultimas noticias
   */
  getLatestNews() {
    return this.get<News[]>({
      endpoint: '/news'
    })
  }

  /**
   * Obtiene una lista de programas 
   * @returns Un Observable que contiene la lista de programas
   */
  getProgramsBySection(section: number) {
    return this.get<any[]>({
      endpoint: `/programs?_append=city&section=${section}`
    })
  }

  getProgramById(id: string) {
    return this.get<any[]>({
      endpoint: `/programs/${id}`
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