import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { formatDate } from '@angular/common';
import { LogType } from './models/Log';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Comunidad Serviacero'

  constructor(private router: Router, private api: ApiService, private auth: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (router.navigated) {
          this.getModuleId(event.url, async moduleId => {
            const userId = await this.auth.userId
            this.api.postLog({
              moduleId,
              userId,
              date: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'es-MX'),
              type: LogType.MODULE
            }).subscribe({
              error: (error) => console.error(error)
            })
          })
        }
      }
    })
  }

  protected getModuleId(url: string, get: (moduleId: string) => Promise<void> | void) {
    switch (true) {
      case /^\/instalaciones/.test(url):
        return get(ModuleId.INSTALACIONES)
      case /^\/programas/.test(url):
        return get(ModuleId.PROGRAMAS)
      case /^\/galeria/.test(url):
        return get(ModuleId.GALERIA)
      case /^\/calendario/.test(url):
        return get(ModuleId.CALENDARIO)
      default:
        throw new Error("Ruta no detectada")
    }
  }
}

enum ModuleId {
  GALERIA = 'feacfb1c-8c3d-4e2d-bb4f-a06e970c7341',
  PROGRAMAS = 'd27637ba-c9df-4d8b-bfab-9d99a6f127d8',
  CALENDARIO = '74991726-9646-4936-aa2e-01e53bacdc70',
  INSTALACIONES = '8ee6e418-9038-4b0e-a513-9096ede030d5'
}
