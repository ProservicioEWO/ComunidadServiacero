import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { State } from "../utils/State";
import _ from "lodash"

@Component({
  selector: 'app-programas',
  templateUrl: './programas.html',
  styleUrls: ['./programas.css']
})

export class Programas implements OnInit {
  queryParams = {}
  sectionId: number | null = null
  currentTabIndex: number | null = null
  cityGroupState = {
    data: null,
    error: null,
    loading: false
  } as State<CityGroup[]>

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sectionId = Number(params.get("variable"))
      if (this.sectionId) {
        this.cityGroupState.loading = true
        this.api.getProgramsBySection(this.sectionId).subscribe({
          next: (data) => {
            this.cityGroupState.data = _(data)
              .groupBy("city.name")
              .map<CityGroup>((programs, name) => ({ name, programs }))
              .value()
          },
          error: (err) => this.cityGroupState.error = err,
          complete: () => this.cityGroupState.loading = false
        })
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