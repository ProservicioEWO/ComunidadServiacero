import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgImageSliderModule } from 'ng-image-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { Nav } from './nav/nav';
import { Conocenos } from './conocenos/conocenos';
import { Instalaciones } from './instalaciones/instalaciones';
import { InstalacionesLeon } from './instalaciones/leon/instalacionesLeon';
import { InstalacionesQueretaro } from './instalaciones/queretaro/instalacionesQueretaro';
import { InstalacionesMonterrey } from './instalaciones/monterrey/instalacionesMonterrey';
import { Footer } from './footer/footer';
import { Programas } from './programas/programas';
import { Galeria } from './galeria/galeria';
import { Calendario } from './calendario/calendario';
// import { CalendarModule } from 'primeng/calendar';
import { Familia } from './galeria/familia/familia';

//Rutas
import { AppRoutingModule } from './app-routing.module';
import { General } from './galeria/general/general';
import { CalendarComponent } from './calendar/calendar.component';
import { Prepa } from './galeria/prepa/prepa';
import { Escuela } from './galeria/escuela/escuela';
import { Kickoff } from './galeria/kickoff/kickoff';
import { LoginComponent } from './login/login.component';
import { ValueComponent } from './login/value/value.component';

@NgModule({

  declarations: [
    AppComponent,
    Nav,
    Conocenos,
    Instalaciones,
    InstalacionesLeon,
    InstalacionesQueretaro,
    InstalacionesMonterrey,
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
    CommonModule,
    HttpClientModule,
    CalendarModule,
    BrowserAnimationsModule,
    NgImageSliderModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    Calendario
  ]
})
export class AppModule {}
