import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView } from 'angular-calendar';
import { CustomDateFormatter } from './CustomDateFormatter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [{ provide: CalendarDateFormatter, useClass: CustomDateFormatter }],
})
export class CalendarComponent {
  locale = 'es'

  view: CalendarView = CalendarView.Month;
  viewDate = new Date()

  @Input() events: CalendarEvent[]

  setView(view: CalendarView) {
    this.view = view
  }
}
