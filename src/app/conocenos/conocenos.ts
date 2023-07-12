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
  selector: 'app-conocenos',
  templateUrl: './conocenos.html',
  styleUrls: ['./conocenos.css'],
})

export class Conocenos {
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

    if (width < 500) {
      this.height = width / 1.5;
    } else if (width < 800) {
      this.height = width / 2.5;
    } else if (width < 1000) {
      this.height = width / 3.5;
    } else if (width < 1200) {
      this.height = width / 4.5;
    } else {
      this.height = 400;
    }
  }

  imageObject: Array<object> = [
    {
      image: './../../../assets/Imagenes/galería/familias/familias1.jpg',
      thumbImage: './../../../assets/Imagenes/familias/familias1.jpg',
      alt: '',
      title: '',
    },
    {
      image: './../../../assets/Imagenes/familias/familias2.jpg',
      thumbImage: './../../../assets/Imagenes/familias/familias2.jpg',
      title: '',
      alt: '',
    },
    {
      image: './../../../assets/Imagenes/familias/familias3.jpg',
      thumbImage: './../../../assets/Imagenes/familias/familias3.jpg',
      title: '',
      alt: '',
    },
    {
      image: './../../../assets/Imagenes/familias/familias4.jpg',
      thumbImage: './../../../assets/Imagenes/familias/familias4.jpg',
      title: '',
      alt: '',
    },
    {
      image: './../../../assets/Imagenes/familias/familias5.jpg',
      thumbImage: './../../../assets/Imagenes/familias/familias5.jpg',
      title: '',
      alt: '',
    },
    {
      image: './../../../assets/Imagenes/familias/familias6.jpg',
      thumbImage: './../../../assets/Imagenes/familias/familias6.jpg',
      title: '',
      alt: '',
    },
  ];
}
