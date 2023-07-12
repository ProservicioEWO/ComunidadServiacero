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
  selector: 'app-prepa',
  templateUrl: './prepa.html',
  styleUrls: ['./prepa.css'],
})
export class Prepa {

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
          image: './../../../assets/Imagenes/Programa_preparatoria/Programa-preparatoria-león.jpg',
          thumbImage: './../../../assets/Imagenes/Programa_preparatoria/Programa-preparatoria-león.jpg',
          alt: '',
          title: '',
        },
        {
          image: './../../../assets/Imagenes/Programa_preparatoria/programa-preparatoria-primera-generacion-monterrey.jpg',
          thumbImage: './../../../assets/Imagenes/Programa_preparatoria/programa-preparatoria-primera-generacion-monterrey.jpg',
          title: '',
          alt: '',
        },
        {
          image: './../../../assets/Imagenes/Programa_preparatoria/programa-preparatoria-primera-generación-león.jpg',
          thumbImage: './../../../assets/Imagenes/Programa_preparatoria/programa-preparatoria-primera-generación-león.jpg',
          title: '',
          alt: '',
        },
        {
          image: './../../../assets/Imagenes/Programa_preparatoria/programa-preparatoria-primera-generación-querétaro.jpg',
          thumbImage: './../../../assets/Imagenes/Programa_preparatoria/programa-preparatoria-primera-generación-querétaro.jpg',
          title: '',
          alt: '',
        },
        {
          image: './../../../assets/Imagenes/Programa_preparatoria/Programa-preparatoria-qerétaro-segunda-generación.jpg',
          thumbImage: './../../../assets/Imagenes/Programa_preparatoria/Programa-preparatoria-qerétaro-segunda-generación.jpg',
          title: '',
          alt: '',
        },
        {
          image: './../../../assets/Imagenes/Programa_preparatoria/Programa-preparatoria-segunda-generación-querétaro.jpg',
          thumbImage: './../../../assets/Imagenes/Programa_preparatoria/Programa-preparatoria-segunda-generación-querétaro.jpg',
          title: '',
          alt: '',
        },
      ];

}