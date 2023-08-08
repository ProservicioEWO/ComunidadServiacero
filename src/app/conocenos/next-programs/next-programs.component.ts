import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-next-programs',
  templateUrl: './next-programs.component.html',
  styleUrls: ['./next-programs.component.scss']
})
export class NextProgramsComponent implements OnInit {
  programs$: Observable<any[]>

  constructor(private api: ApiService) { }

  ngOnInit() {
    const today = new Date()
    this.programs$ = this.api.getInternalPrograms()
      .pipe(
        map(array => array.filter(({ date, auto }) => (
          !auto || new Date(date) > today
        )))
      )
  }
}
