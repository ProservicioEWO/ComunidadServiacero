import localeEs from '@angular/common/locales/es';

import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgImageSliderModule } from 'ng-image-slider';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { GalleriaModule } from 'primeng/galleria';
import { ListboxModule } from 'primeng/listbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { FullCalendarModule } from '@fullcalendar/angular'

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
import { CalendarComponent } from './calendario/calendar/calendar.component';
import { GalleryComponent } from './conocenos/gallery/gallery.component';
import { NewsListComponent } from './conocenos/news-list/news-list.component';
import { NextProgramsComponent } from './conocenos/next-programs/next-programs.component';
import { TestimonialsListComponent } from './conocenos/testimonials-list/testimonials-list.component';
import { GaleriaDetalles } from './galeria/galeria-detalles/galeria-detalles.component';
import { InstalacionesDetalles } from './instalaciones/instalaciones-detalles/instalaciones-detalles.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { ValueComponent } from './login/value/value.component';
import { ProgramasDetalles } from './programas/programas-detalles/programas-detalles.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';

registerLocaleData(localeEs)

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
    ProgramasDetalles,
    NewsListComponent,
    GalleryComponent,
    TestimonialsListComponent,
    NextProgramsComponent,
    HomeComponent
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
    TabViewModule,
    ListboxModule,
    CardModule,
    DataViewModule,
    CarouselModule,
    SkeletonModule,
    FullCalendarModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    Calendario
  ]
})
export class AppModule { }
