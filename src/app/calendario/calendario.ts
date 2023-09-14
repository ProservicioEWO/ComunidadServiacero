import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import rrulePlugin from '@fullcalendar/rrule'

import { ApiService } from '../services/api.service';
import { State } from '../utils/State';
import _ from 'lodash';
import { RRule } from 'rrule';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.html',
  styleUrls: ['./calendario.css'],
})


export class Calendario implements OnInit {

  private unsubscribe$ = new Subject<void>()

  testEvents = [
    {
      title: 'Pruebita',
      rrule: {
        freq: RRule.DAILY,
        dtstart: '2023-09-12',
        until: '2023-09-29'
      },
      color: 'yellow'
    },
    {
      start: '2023-09-12',
      end: '2023-09-19',
      color: '#00eea4'
    },
  ]

  options: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'es-MX',
    buttonText: {
      today: 'Hoy'
    },
    buttonHints: {
      next: "mes siguiente",
      prev: "mes anterior"
    },
    plugins: [dayGridPlugin, rrulePlugin],
  }

  viewDate = new Date()
  newEvents: CalendarEvent[] = []
  programsByCity = {
    data: null,
    error: null,
    loading: true
  } as State<any>
  filter = false

  selectedListItem: any = null

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getPrograms()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          const onlyInternal = data.filter(e => e.type === "i")
          const transformedData = Object.entries(_.groupBy(onlyInternal, "city.name")).map(([cityName, cityData]) => ({ cityName, cityData }))
          this.programsByCity.data = transformedData
          const calEvnts = onlyInternal.map<CalendarEvent>(e => ({
            title: e.shortName,
            start: this.tiempo(new Date(e.date)),
            end: this.tiempo(new Date(e.end)),
            color: {
              primary: e.color,
              secondary: e.color
            }
          }))
          this.newEvents = calEvnts
        },
        error: (error) => this.programsByCity.error = error,
        complete: () => this.programsByCity.loading = false
      })
  }

  tiempo(date: Date): Date {
    date.setDate(date.getDate() + 1)
    return date
  }

  listOnChange(e: any) {
    this.viewDate = new Date(e.date)
  }

  handleViewChange(date: Date) {
    if (this.viewDate !== date) {
      this.selectedListItem = null
    }
  }
}
