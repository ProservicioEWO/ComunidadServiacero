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
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../services/api.service';
import _, { Dictionary } from 'lodash'
import { City } from '../models';
import { State } from '../utils/State';
import { startOfMonth, startOfWeek, startOfDay, daysInWeek } from 'date-fns'

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

  private unsubscribe$ = new Subject<void>()

  newEvents: CalendarEvent[] = []
  programsByCity = {
    data: null,
    error: null,
    loading: true
  } as State<any>
  filter = false

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
            start: new Date(e.date),
            end: new Date(e.end),
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

  listOnChange(e: any){
    console.log(e)
  }
}
