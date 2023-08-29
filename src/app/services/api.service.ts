import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  City,
  Event,
  Location,
  Log,
  News,
  Testimonial
} from '../models';

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
   * Obtiene una lista de los centros de servicio (sustituo de ciudades) y sus respectivas instalaciones
   * @returns Un Observable que contiene la lista de ciudades
   */
  getSites() {
    return this.get<City[]>({
      endpoint: "/sites?_join=locations"
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
   * Obtiene una lista de programas
   * @returns Un Observable que contiene la lista de eventos
   */
  getInternalPrograms() {
    return this.get<any[]>({
      endpoint: "/programs?_append=city&type=i"
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
   * Obtiene una lista de las ultimas noticias
   * @returns Un Observable que contiene la lista de las ultimas noticias
   */
  getTestimonials() {
    return this.get<Testimonial[]>({
      endpoint: '/testimonials'
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
    return this.get<any>({
      endpoint: `/programs/${id}`
    })
  }

  /**
   * Obtiene las instalaciones que pertenecen a una determinado centro de servicio (sistuto de ciudad)
   * @param cityId El ID de la ciudad a consultar
   * @returns Un Observable que contiene la lista de instalaciones
   */
  getLocationsBySite(cityId: string) {
    return this.get<Location[]>({
      endpoint: `/sites/${cityId}/locations`
    })
  }

  /**
   * Inserta un registro (log) en la base de datos
   * @param log la informacion de log
   * @returns Un observable que contiene informacion del log insertado
   */
  postLog(log: Log) {
    return this.post<Log>({
      endpoint: `/logs`,
      body: log
    })
  }

  private get<T>({ endpoint }: ApiGetOptions) {
    return this.http.get<T>(`${this.apiBaseUrl}${endpoint}`)
  }

  private post<T>({ endpoint, body }: ApiPostOptions<T>) {
    return this.http.post(`${this.apiBaseUrl}${endpoint}`, body)
  }
}

interface ApiGetOptions {
  endpoint: string,
}

interface ApiPostOptions<T> {
  endpoint: string,
  body: T
}