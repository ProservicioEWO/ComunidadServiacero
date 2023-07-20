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
import { Escuela } from './galeria/escuela/escuela';
import { Familia } from './galeria/familia/familia';
import { General } from './galeria/general/general';
import { Kickoff } from './galeria/kickoff/kickoff';
import { Prepa } from './galeria/prepa/prepa';
import { LoginComponent } from './login/login.component';
import { ValueComponent } from './login/value/value.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';

@NgModule({

  declarations: [
    AppComponent,
    Nav,
    Conocenos,
    Instalaciones,
    Footer,
    Programas,
    Galeria,
    Familia,
    Prepa,
    Escuela,
    Kickoff,
    General,
    Calendario,
    CalendarComponent,
    LoginComponent,
    ValueComponent,
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
