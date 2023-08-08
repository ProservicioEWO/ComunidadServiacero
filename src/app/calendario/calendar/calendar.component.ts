import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() events: CalendarEvent[]
  @Input() viewDate: Date

  @Output() onViewChange = new EventEmitter<Date>()

  handleViewChange() {
    this.onViewChange.emit(this.viewDate)
  }

  setView(view: CalendarView) {
    this.view = view
  }
}