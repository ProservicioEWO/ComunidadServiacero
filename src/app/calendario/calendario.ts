import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarMonthViewDay,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import { daysInWeek } from 'date-fns';
import { ApiService } from '../services/api.service';
import _, { Dictionary } from 'lodash'
import { City } from '../models';
import { State } from '../utils/State';
import { startOfMonth, startOfWeek, startOfDay } from 'date-fns'

const RED_CELL: 'red-cell' = 'red-cell';
const BLUE_CELL: 'blue-cell' = 'blue-cell';
const DEF_CELL: 'ng-star-inserted' = 'ng-star-inserted';

@Component({
  selector: 'app-calendario',
  /* changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None, */
  templateUrl: './calendario.html',
  styleUrls: ['./calendario.css'],
})


export class Calendario implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate = new Date()

  newEvents: CalendarEvent[] = []
  programsByCity = {
    data: null,
    error: null,
    loading: true
  } as State<any>

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    //Recordar desuscribir del observador!!!
    this.api.getPrograms().subscribe({
      next: (data) => {
        this.programsByCity.data = Object.entries(_.groupBy(data, "city.name")).map(([cityName, cityData]) => ({ cityName, cityData }))

        const calEvnts = data.filter(e => e.type === "i").map<CalendarEvent>(e => ({
          title: e.shortName,
          start: new Date(e.date),
          end: new Date(e.end),
          color: e.color
        }))
        this.newEvents = calEvnts
      },
      error: (error) => this.programsByCity.error = error,
      complete: () => this.programsByCity.loading = false
    })
  }

  previous(): void {
    if (this.view === CalendarView.Month) {
      // Navegar al mes anterior
      this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    } else if (this.view === CalendarView.Week) {
      // Navegar a la semana anterior
      this.viewDate = new Date(this.viewDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (this.view === CalendarView.Day) {
      // Navegar al día anterior
      this.viewDate = new Date(this.viewDate.getTime() - 24 * 60 * 60 * 1000);
    }
  }

  next(): void {
    if (this.view === CalendarView.Month) {
      // Navegar al próximo mes
      this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    } else if (this.view === CalendarView.Week) {
      // Navegar a la próxima semana
      this.viewDate = new Date(this.viewDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    } else if (this.view === CalendarView.Day) {
      // Navegar al próximo día
      this.viewDate = new Date(this.viewDate.getTime() + 24 * 60 * 60 * 1000);
    }
  }

  setView(view: CalendarView) {
    this.view = view;
    // Restablecer la fecha de la vista actual para mostrar el primer día/semana/mes en la nueva vista.
    if (view === CalendarView.Month) {
      this.viewDate = startOfMonth(this.viewDate);
    } else if (view === CalendarView.Week) {
      this.viewDate = startOfWeek(this.viewDate);
    } else if (view === CalendarView.Day) {
      this.viewDate = startOfDay(this.viewDate);
    }
  }
}
