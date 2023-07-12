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
  selector: 'app-escuela',
  templateUrl: './escuela.html',
  styleUrls: ['./escuela.css'],
})
export class Escuela {
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
      image: './../../../assets/Imagenes/galería/adopta una escuela1.jpg',
      thumbImage: './../../../assets/Imagenes/galería/adopta una escuela1.jpg',
      alt: '',
      title: '',
    },
    {
      image: './../../../assets/Imagenes/galería/adopta una escuela2.jpg',
      thumbImage: './../../../assets/Imagenes/galería/adopta una escuela2.jpg',
      title: '',
      alt: '',
    },
    {
      image: './../../../assets/Imagenes/galería/adopta una escuela3.jpg',
      thumbImage: './../../../assets/Imagenes/galería/adopta una escuela3.jpg',
      title: '',
      alt: '',
    },
    {
      image: './../../../assets/Imagenes/galería/adopta una escuela4.jpg',
      thumbImage: './../../../assets/Imagenes/galería/adopta una escuela4.jpg',
      title: '',
      alt: '',
    },
    {
      image: './../../../assets/Imagenes/galería/adopta una escuela5.jpg',
      thumbImage: './../../../assets/Imagenes/galería/adopta una escuela5.jpg',
      title: '',
      alt: '',
    },
    {
      image: './../../../assets/Imagenes/galería/adopta una escuela6.jpg',
      thumbImage: './../../../assets/Imagenes/galería/adopta una escuela6.jpg',
      title: '',
      alt: '',
    },
  ];
}
