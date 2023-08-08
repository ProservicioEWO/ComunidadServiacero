import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/utils/State';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-programas-detalles',
  templateUrl: './programas-detalles.component.html',
  styleUrls: ['./programas-detalles.component.scss']
})
export class ProgramasDetalles implements OnInit {
  programDetail$: Observable<any>

  constructor(private route: ActivatedRoute, private auth: AuthService, private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const programId = params.get("variable")
      if (programId) {
        this.programDetail$ = this.api.getProgramById(programId)
      }
    })
  }
}
