import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { State } from "../utils/State";
import _ from "lodash"
import { Observable, map } from "rxjs";

@Component({
  selector: 'app-programas',
  templateUrl: './programas.html',
  styleUrls: ['./programas.css']
})

export class Programas implements OnInit {
  cityGroups$: Observable<CityGroup[]>

  queryParams = {}
  sectionId: number | null = null
  currentTabIndex: number | null = null

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sectionId = Number(params.get("variable"))
      if (this.sectionId) {
        this.cityGroups$ = this.api.getProgramsBySection(this.sectionId)
          .pipe(
            map(arr => (
              !!arr.length ?
                _(arr)
                  .groupBy("city.name")
                  .map<CityGroup>((programs, name) => ({ name, programs }))
                  .orderBy(cityGroups => cityGroups.name)
                  .value() : []
            ))
          )
      }
    })

    const indexQueryParam = this.route.snapshot.queryParamMap.get("index")
    if (indexQueryParam) {
      this.currentTabIndex = Number(indexQueryParam)
    }
  }

  handleChangeIndex(index: number | null) {
    if (index !== null) {
      this.currentTabIndex = index
    }
  }
}

interface CityGroup {
  name: string
  programs: any[]
}