import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ApiService } from '../services/api.service';
import { State } from '../utils/State';
import _ from 'lodash';

@Component({
  selector: 'app-calendario',
  /* changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None, */
  templateUrl: './calendario.html',
  styleUrls: ['./calendario.css'],
})


export class Calendario implements OnInit {

  private unsubscribe$ = new Subject<void>()

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
    date.setDate(date.getDate() + 1);
    return date;
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
