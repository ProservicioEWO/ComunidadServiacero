import {
  Component,
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.html',
  styleUrls: ['./familia.css'],
})
export class Familia {
  height = 400;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    // register on window resize event
    fromEvent(window, 'resize')
      .pipe(throttleTime(500), debounceTime(500))
      .subscribe(() => this.setHeight());
  }

  ngAfterViewInit() {
    this.setHeight();
  }

  private setHeight() {
    const width = this.elementRef.nativeElement.offsetWidth;
    this.height = width / 2.5;
  }

  imageObject: Array<object> = [
    {
      image:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia1.jpg',
      thumbImage:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia1.jpg',
      alt: '',
      title: '',
    },
    {
      image:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia2.jpg',
      thumbImage:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia2.jpg',
      title: '',
      alt: '',
    },
    {
      image:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia3.jpg',
      thumbImage:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia3.jpg',
      title: '',
      alt: '',
    },
    {
      image:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia4.jpg',
      thumbImage:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia4.jpg',
      title: '',
      alt: '',
    },
    {
      image:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia5.jpg',
      thumbImage:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia5.jpg',
      title: '',
      alt: '',
    },
    {
      image:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia6.jpg',
      thumbImage:
        './../../../assets/Imagenes/día_de_la_familia/día-de-la-familia6.jpg',
      title: '',
      alt: '',
    },
  ];
}
