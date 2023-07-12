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
  selector: 'app-kickoff',
  templateUrl: './kickoff.html',
  styleUrls: ['./kickoff.css'],
})
export class Kickoff implements AfterViewInit {

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
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/Kick-off león.jpg',
      thumbImage:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/Kick-off león.jpg',
      alt: '',
      title: '',
    },
    {
      image:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/Kick-Off-León2.jpg',
      thumbImage:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/Kick-Off-León2.jpg',
      title: '',
      alt: '',
    },
    {
      image:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/kick-off-matriz.jpg',
      thumbImage:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/kick-off-matriz.jpg',
      title: '',
      alt: '',
    },
    {
      image:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/kick-off-monterrey.jpg',
      thumbImage:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/kick-off-monterrey.jpg',
      title: '',
      alt: '',
    },
    {
      image:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/Kick-off-monterrey2.jpg',
      thumbImage:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/Kick-off-monterrey2.jpg',
      title: '',
      alt: '',
    },
    {
      image:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/Kick-Off-Querétaro.jpg',
      thumbImage:
        './../../../assets/Imagenes/Kick_Off_Comunidad_S/Kick-Off-Querétaro.jpg',
      title: '',
      alt: '',
    },
  ];
}
