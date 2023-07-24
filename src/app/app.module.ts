import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgImageSliderModule } from 'ng-image-slider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria'
import { AccordionModule } from 'primeng/accordion'
import { BadgeModule } from 'primeng/badge'

import { AppComponent } from './app.component';
import { Calendario } from './calendario/calendario';
import { Conocenos } from './conocenos/conocenos';
import { Footer } from './footer/footer';
import { Galeria } from './galeria/galeria';
import { Instalaciones } from './instalaciones/instalaciones';
import { Nav } from './nav/nav';
import { Programas } from './programas/programas';

//Rutas
import { AppRoutingModule } from './app-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { ValueComponent } from './login/value/value.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { GaleriaDetalles } from './galeria/galeria-detalles/galeria-detalles.component';
import { InstalacionesDetalles } from './instalaciones/instalaciones-detalles/instalaciones-detalles.component';
import { ProgramasDetalles } from './programas/programas-detalles/programas-detalles.component';

@NgModule({

  declarations: [
    AppComponent,
    Nav,
    Conocenos,
    Instalaciones,
    Footer,
    Programas,
    Galeria,
    Calendario,
    CalendarComponent,
    LoginComponent,
    ValueComponent,
    GaleriaDetalles,
    InstalacionesDetalles,
    ProgramasDetalles
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    CalendarModule,
    BrowserAnimationsModule,
    NgImageSliderModule,
    ToastModule,
    ProgressSpinnerModule,
    GalleriaModule,
    AccordionModule,
    BadgeModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  exports: [
    Calendario
  ]
})
export class AppModule { }
