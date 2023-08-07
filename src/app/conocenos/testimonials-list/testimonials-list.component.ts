import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { Testimonial } from 'src/app/models/Testimonial';
import { ApiService } from 'src/app/services/api.service';
import { Breakpoint } from 'src/app/utils/Breakpoint';

@Component({
  selector: 'app-testimonials-list',
  templateUrl: './testimonials-list.component.html',
  styleUrls: ['./testimonials-list.component.scss']
})
export class TestimonialsListComponent implements OnInit {

  testimonials$: Observable<Testimonial[]>

  responsiveOptionsCorousel = [
    {
      breakpoint: Breakpoint.xl,
      numVisible: 4,
      numScroll: 4
    },
    {
      breakpoint: Breakpoint.lg,
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: Breakpoint.md,
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: Breakpoint.sm,
      numVisible: 1,
      numScroll: 1
    }
  ]

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.testimonials$ = this.api.getTestimonials()
  }
}