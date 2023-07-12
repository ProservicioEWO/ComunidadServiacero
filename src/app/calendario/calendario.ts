import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarMonthViewDay,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import { daysInWeek } from 'date-fns';
import getMonth from 'date-fns/esm/fp/getMonth/index';

const RED_CELL: 'red-cell' = 'red-cell';
const BLUE_CELL: 'blue-cell' = 'blue-cell';
const DEF_CELL: 'ng-star-inserted' = 'ng-star-inserted';

@Component({
  selector: 'app-calendario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendario.html',
  styleUrls: ['./calendario.css'],
})


export class Calendario implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  events: CalendarEvent[] = [];
  refresh = new Subject<void>();
  cssClass: string = RED_CELL;
  clickedDate: Date = new Date();
  EndDate : Date = new Date();
  startDate : Date = new Date();
  dayWeek : number;

  activeTab: String = 'LEO';
  myPage: String = '';
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDays: any = [];

  array11 = [
    'Prepa Abierta',
    'Finanzas Personales',
    'Excel Inicial',
    'Excel Avanzado',
    'Word',
    'Power Point',
  ];
  array12 = ['Prepa Abierta MTY'];
  array13 = ['Prepa Abierta QRO'];


  arraydv110 = [
    'Programa Preparatoria SW Planta León',
    'Retoma tus estudios para incrementar las oportunidades de crecimiento. Cursa y termina tu preparatoria en menos de 7 meses.',
    'Duración:100 horas aproximadas (divididas en 1 sesión semanal de 4 horas)',
    'Fecha Inicio: 02/07/2022',
    'Fecha Final:  17/12/2022',
    'Costo Programa (Clases y Material de Trabajo) $6,850.00 MXN <br> Derecho a Examen Global de preparatoria $2,499.00 MXN <br> Trámite de Certificación $1,499.00 MXN',
    'Serviacero Worthington te apoyará en cubrir los costos del programa y del trámite de certificación, que en total suman: $8,349.00 MNX <br>' +
      'El Colaborador solamente deberá cubrir el costo del derecho a examen global de preparatoria ($2,499.00 MXN)',
    'https://forms.office.com/r/jLx0zZv85k',
    '',
    '•	Método de investigación <br> • Historia de México <br> •	Estudios socioeconómicos <br> • Taller de lectura y redacción <br> • Inglés <br>' +
    '•	Informática <br> • Química <br> • Geografía <br> • Ecología <br> • Literatura <br> • Taller de habilidades blandas',
    '•	Ser Colaborador de Serviacero <br> •	Contar con contrato por tiempo indeterminado <br>  •	Tener >=85% de Competencias Aprobadas <br>' +
    '•	Tener CERO Faltas Injustificadas los últimos 6 meses <br> •	Tener MÁXIMO 1 Retardo en los últimos 6 meses <br>  •	No tener actas administrativas en tu historial',
    '07/02/2022',
    '12/17/2022',
    '6'
  ];

  arraydv111 = [
    'Curso: Finanzas Personales',
    'Promover en los participantes el desarrollo de competencias básicas en el manejo de sus recursos económicos, que propicien un mejor rendimiento y beneficio para su entorno próximo (cultura financiera).',
    'Duración: 8 Horas',
    'Fechas inicio disponible próximamente',
    'Fechas final disponible próximamente',
    'Costos disponibles próximamente',
    'Información del apoyo disponible próximamente',
    'https://forms.office.com/r/z2PQfraEBy',
    '',
    '•	Antecedentes y Conceptos <br>• Deudas <br>• Inversiones <br>•	Administrando mi dinero',
    '•	Ser Colaborador de Serviacero <br>•	Contar con contrato por tiempo indeterminado <br>• Tener >=85% de Competencias Aprobadas<br>' +
    '• Tener CERO Faltas Injustificadas los últimos 6 meses <br>• Tener MÁXIMO 1 Retardo en los últimos 6 meses <br>• No tener actas administrativas en tu historial'
  ];

  arraydv112 = [
    'Curso: Hoja de Cálculo Inicial (Excel)',
    'Promover en los participantes el desarrollo de competencias básicas en el manejo de sus herramientas de Texto, que proporcione un mejor rendimiento y beneficio para su entorno próximo (de formulaciones).',
    '7 Horas',
    'Fechas inicio disponible próximamente',
    'Fechas final disponible próximamente',
    'Costos disponibles próximamente',
    'Información del apoyo disponible próximamente',
    'https://forms.office.com/r/z2PQfraEBy',
    '',
    '•	Antecedentes y Conceptos: Conceptos básicos, comenzando con la práctica, aumentando la productividad, acomodando los datos. <br>' +
      '•	Fase creativa: Modificando la estructura, operando con los datos, funciones, tablas.<br> ' +
      '•	Tópicos de expresión gráfica: Gráficas, formato condicional, notas, otros elementos, imprimir.',
    '•	Ser Colaborador de Serviacero <br>•	Contar con contrato por tiempo indeterminado <br>• Tener >=85% de Competencias Aprobadas<br>' +
      '• Tener CERO Faltas Injustificadas los últimos 6 meses <br>• Tener MÁXIMO 1 Retardo en los últimos 6 meses <br>• No tener actas administrativas en tu historial',
  ];

  arraydv113 = [
    'Curso: Hoja para el cálculo de procesos (Excel)',
    'Promover en los participantes el desarrollo de competencias básicas en el manejo de bases de datos, como herramientas para el control, monitoreo y mejora de procesos.',
    '8.5 Horas',
    'Fechas inicio disponible próximamente',
    'Fechas final disponible próximamente',
    'Costos disponibles próximamente',
    'Información del apoyo disponible próximamente',
    'https://forms.office.com/r/z2PQfraEBy',
    '',
    '•	Conceptos básicos de hoja de cálculo y manejo básico de tablas de datos <br>• Análisis estadístico de una base de datos <br> ' +
      '•	Herramientas de comportamiento',
    '•	Ser Colaborador de Serviacero <br>•	Contar con contrato por tiempo indeterminado <br>• Tener >=85% de Competencias Aprobadas<br>' +
      '• Tener CERO Faltas Injustificadas los últimos 6 meses <br>• Tener MÁXIMO 1 Retardo en los últimos 6 meses <br>• No tener actas administrativas en tu historial',
  ];

  arraydv114 = [
    'Curso: Procesador de textos (Word)',
    'Promover en los participantes el desarrollo de competencias básicas en el manejo de sus herramientas de Texto, que proporcione un mejor rendimiento y beneficio para su entorno próximo (de redacción).',
    '8 Horas',
    'Fechas inicio disponible próximamente',
    'Fechas final disponible próximamente',
    'Costos disponibles próximamente',
    'Información del apoyo disponible próximamente',
    'https://forms.office.com/r/z2PQfraEBy',
    '',
    '•	Antecedentes y Conceptos: Introducción, Descripción de los elementos de la ventana, Manejo de Documentos, Manejo de bloques, Presentación de Documento (Formato). <br> ' +
      '•	Fase creativa: Formatos básicos, Manejo de secciones, Herramientas de Edición, Comentarios. <br> ' +
      '•	Tópicos de expresión gráfica: Manejo de tablas, Manejo de imágenes, Combinación de correspondencias, Edición Avanzada, Guardar como PDF y página web.<br> ' +
      '•	Administrador de Textos: Manejo de Publicaciones, Bibliografía y administrador de fuentes, Formularios, Macros.',
    '•	Ser Colaborador de Serviacero <br>•	Contar con contrato por tiempo indeterminado <br>• Tener >=85% de Competencias Aprobadas<br>' +
      '• Tener CERO Faltas Injustificadas los últimos 6 meses <br>• Tener MÁXIMO 1 Retardo en los últimos 6 meses <br>• No tener actas administrativas en tu historial',
  ];

  arraydv115 = [
    'Curso: Presentaciones en Power Point',
    'Promover en los participantes el desarrollo de competencias básicas en el manejo de sus herramientas de Texto, que proporcione un mejor rendimiento y beneficio para su entorno próximo (de presentaciones).',
    '8 Horas',
    'Fechas inicio disponible próximamente',
    'Fechas final disponible próximamente',
    'Costos disponibles próximamente',
    'Información del apoyo disponible próximamente',
    'https://forms.office.com/r/z2PQfraEBy',
    '',
    '•	Antecedentes y Conceptos: Elementos esenciales de PowerPoint, Trabajo de Texto, Insertar una fecha.<br> ' +
      '•	Fase creativa: Agregar Tablas a las diapositivas, Utilizar gráficos en una presentación, Creación de gráficos SmartArt.<br> ' +
      '•	Desarrollo de esquemas y gráficos<br> ' +
      '•	Administrador de Textos: Asegurar y compartir una presentación, Dar una presentación.',
    '•	Ser Colaborador de Serviacero <br>•	Contar con contrato por tiempo indeterminado <br>• Tener >=85% de Competencias Aprobadas<br>' +
      '• Tener CERO Faltas Injustificadas los últimos 6 meses <br>• Tener MÁXIMO 1 Retardo en los últimos 6 meses <br>• No tener actas administrativas en tu historial',
  ];

  arraydv210 = [
    'Programa Preparatoria SW Planta Querétaro',
    'Retoma tus estudios para incrementar las oportunidades de crecimiento. Cursa y termina tu preparatoria en menos de 8 meses.',
    'Duración: 120 horas aprox (divididas en 1 sesión semanal de 4 horas)',
    'Fecha Inicio: 13/10/2022',
    'Fecha Final:  01/06/2023',
    '•	Costo de las clases $8,500.00 MXN <br> •	Guías o materiales $1,300.00 MXN <br> •	Viaje a la ciudad de aplicación $500.00 MXN <br>' +
      '•	Costo de certificación $1,500.00 MXN <br> •	Costo del examen global: $2,500.00 MXN',
    '•	Serviacero Worthington te apoyará en cubrir los costos del programa, guías, viaje a ciudad de aplicación y del trámite de certificación, que en total suman: $11,800.00 MXN <br>' +
      '•	El Colaborador solamente deberá cubrir el costo del derecho a examen global de preparatoria ($2,500.00 MXN)',
    'https://forms.office.com/r/jLx0zZv85k',
    '',
    '• Comunicación <br> • Ciencias Sociales <br> • Humanidades <br> •	Capacitación para el trabajo <br>' +
    '• Aplicación para el trabajo <br> • Inglés <br> •	Matemáticas <br> • Ciencias experimentales ',
    '• Ser Colaborador de Serviacero. <br>• Contar con contrato por tiempo indeterminado. <br>• Tener >=85% de Competencias Aprobadas.<br>' +
    '• Tener CERO Faltas Injustificadas los últimos 6 meses. <br>• Tener MÁXIMO 1 Retardo en los últimos 6 meses. <br>• No tener actas administrativas en tu historial.',
    '06/25/2022',
    '11/12/2022',
    '6'
  ];

  arraydv310 = [
    'Programa Preparatoria SW Planta Monterrey',
    'Retoma tus estudios para incrementar las oportunidades de crecimiento. Cursa y termina tu preparatoria en menos de 6 meses.',
    'Duración: 85 horas aproximadas (divididas en 1 sesión semanal de 4 horas)',
    'Fecha Inicio: 25/06/2022',
    'Fecha Final:  12/11/2022',
    '• Costo Programa (Clases y Material de Trabajo) $8,350.00 MXN <br> • Derecho a Examen Global de preparatoria $2,000.00 MXN',
    '•	Serviacero Worthington te apoyará en cubrir los costos del programa y del trámite de certificación, que en total suman: $8,350.00 MXN <br>' +
      '•	El Colaborador solamente deberá cubrir el costo del derecho a examen global de preparatoria ($2,000.00 MXN)',
    'https://forms.office.com/r/jLx0zZv85k',
    '',
    '• Matemáticas. <br>• Ciencias Sociales. <br>• Español. <br>• Ciencias experimentales. <br>',
    '• Ser Colaborador de Serviacero.<br>• Contar con contrato por tiempo indeterminado.<br>• Tener >=85% de Competencias Aprobadas.<br>' +
    '• Tener CERO Faltas Injustificadas los últimos 6 meses. <br>• Tener MÁXIMO 1 Retardo en los últimos 6 meses. <br>• No tener actas administrativas en tu historial.',
    '10/13/2022',
    '06/01/2023',
    '4'
  ];

  //Método que refresca el calendario cuando se de Click
  refreshView(curso:string): void {
    switch (curso) {
      case 'ck10': {
        this.startDate = new Date(this.arraydv110[11]);
        this.EndDate = new Date(this.arraydv110[12]);
        this.dayWeek = Number(this.arraydv110[13]);
        break;
      }

      case 'ck20': {
        this.startDate = new Date(this.arraydv210[11]);
        this.EndDate = new Date(this.arraydv210[12]);
        this.dayWeek = Number(this.arraydv210[13]);
        break;
      }

      case 'ck30': {
        this.startDate = new Date(this.arraydv310[11]);
        this.EndDate = new Date(this.arraydv310[12]);
        this.dayWeek = Number(this.arraydv310[13]);
        break;
      }
    }


    if (curso.includes("0")){
      this.cssClass = RED_CELL;
      this.refresh.next();
    }else{
      this.cssClass = DEF_CELL;
      this.refresh.next();
    }
  }

  //Método que recarga los estilos en el calendario
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    // const startDate = new Date("07/02/2022");
    // const EndDate = new Date("12/17/2022");

    body.forEach((day) => {
      const dayOfMonth = day.date.getDate();

      const now = new Date( (day.date.getMonth() + 1) + "/" + day.date.getDate() + "/" + day.date.getFullYear());

      //Función que pinta de color todos los viernes
      if (day.day == this.dayWeek  && now <= this.EndDate && now >= this.startDate){
        console.log("Now " + now.toString() + " EndDate " + this.EndDate.toString() + " Start " + this.startDate.toString())
        day.cssClass = this.cssClass;
      }else{
        day.cssClass = DEF_CELL;
      }

    });
  }

  //Método que recarga los estilos en el calendario
  //  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
  //   console.log("Si estoy Entrando");
  //   renderEvent.body.forEach((day) => {
  //     const dayOfMonth = day.date.getDate();
  //     if (dayOfMonth > 5 && dayOfMonth < 10 && day.inMonth) {
  //       day.cssClass = 'bg-pink';
  //       console.log("Si entro");
  //     }
  //   });
  //  }

  //Método que se ejecuta después de que se renderiza la página
  ngAfterViewInit(){
    $("#ck10").prop('checked', true);
  }

  //Método que Que se ejecuta al cargar la página y esconde el panel de cursos
  ngOnInit(): void {
//    $('#dvCurso').hide();
    this.onCursoClick("ck10");
  }

  //Método click paa pintar cuadros del calendario
  // dayClicked(day: CalendarMonthViewDay): void {
  //   this.selectedMonthViewDay = day;
  //   const selectedDateTime = this.selectedMonthViewDay.date.getTime();

  //   const dateIndex = this.selectedDays.findIndex(
  //     (selectedDay) => selectedDay.date.getTime() === selectedDateTime
  //   );

  //   if (dateIndex > -1) {
  //     delete this.selectedMonthViewDay.cssClass;
  //     this.selectedDays.splice(dateIndex, 1);
  //   } else {
  //     this.selectedDays.push(this.selectedMonthViewDay);
  //     day.cssClass = 'cal-day-selected';
  //     this.selectedMonthViewDay = day;
  //   }

  // }

  //Método que recarga los estilos en el calendario
  // beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
  //   body.forEach((day) => {
  //     if (
  //       this.selectedDays.some(
  //         (selectedDay) => selectedDay.date.getTime() === day.date.getTime()
  //       )
  //     ) {
  //       day.cssClass = 'cal-day-selected';
  //     }
  //   });
  // }

  //Cambio de cursos entre Almacenes
  onTabClick(tab: string) {
    this.activeTab = tab;
  }

  //Muestra datos de los cursos al clickear una casilla
  onCursoClick(curso: string) {

    this.refreshView(curso);

    const dvcurso = document.getElementById('dvCurso');
    var myArray;
    var imgCurso = document.getElementById('imgCurso') as HTMLImageElement;

    $('#dvCurso').show();

    $('.cks').prop('checked', false);
    $('#' + curso).prop('checked', true);

    switch (curso) {
      case 'ck10': {
        $('#lbTitulo').html(this.arraydv110[0]);
        $('#lbDesc').html(this.arraydv110[1]);
        $('#lbCosto').html(this.arraydv110[5]);
        $('#lbApoyo').html(this.arraydv110[6]);
        $('#lbDate1').html(this.arraydv110[3]);
        $('#lbDate2').html(this.arraydv110[4]);
        $('#lbTime').html(this.arraydv110[2]);
        $('#lbMaterias').html(this.arraydv110[9]);
        $('#lbReq').html(this.arraydv110[10]);
        $('#btReglamento').prop('disabled', false);

        this.myPage = this.arraydv110[7];

        imgCurso.src =
          './../../assets/Imagenes/Programa preparatoria/Programa-preparatoria-león.jpg';

        break;
      }

      case 'ck11': {
        $('#lbTitulo').html(this.arraydv111[0]);
        $('#lbDesc').html(this.arraydv111[1]);
        $('#lbCosto').html(this.arraydv111[5]);
        $('#lbApoyo').html(this.arraydv111[6]);
        $('#lbDate1').html(this.arraydv111[3]);
        $('#lbDate2').html(this.arraydv111[4]);
        $('#lbTime').html(this.arraydv111[2]);
        $('#lbMaterias').html(this.arraydv111[9]);
        $('#lbReq').html(this.arraydv111[10]);
        $('#btReglamento').prop('disabled', true);

        this.myPage = this.arraydv111[7];

        imgCurso.src = '';

        break;
      }

      case 'ck12': {
        $('#lbTitulo').html(this.arraydv112[0]);
        $('#lbDesc').html(this.arraydv112[1]);
        $('#lbCosto').html(this.arraydv112[5]);
        $('#lbApoyo').html(this.arraydv112[6]);
        $('#lbDate1').html(this.arraydv112[3]);
        $('#lbDate2').html(this.arraydv112[4]);
        $('#lbTime').html(this.arraydv112[2]);
        $('#lbMaterias').html(this.arraydv112[9]);
        $('#lbReq').html(this.arraydv112[10]);
        $('#btReglamento').prop('disabled', true);

        this.myPage = this.arraydv112[7];

        imgCurso.src = '';

        break;
      }

      case 'ck13': {
        $('#lbTitulo').html(this.arraydv113[0]);
        $('#lbDesc').html(this.arraydv113[1]);
        $('#lbCosto').html(this.arraydv113[5]);
        $('#lbApoyo').html(this.arraydv113[6]);
        $('#lbDate1').html(this.arraydv113[3]);
        $('#lbDate2').html(this.arraydv113[4]);
        $('#lbTime').html(this.arraydv113[2]);
        $('#lbMaterias').html(this.arraydv113[9]);
        $('#lbReq').html(this.arraydv113[10]);
        $('#btReglamento').prop('disabled', true);

        this.myPage = this.arraydv113[7];

        imgCurso.src = '';

        break;
      }

      case 'ck14': {
        $('#lbTitulo').html(this.arraydv114[0]);
        $('#lbDesc').html(this.arraydv114[1]);
        $('#lbCosto').html(this.arraydv114[5]);
        $('#lbApoyo').html(this.arraydv114[6]);
        $('#lbDate1').html(this.arraydv114[3]);
        $('#lbDate2').html(this.arraydv114[4]);
        $('#lbTime').html(this.arraydv114[2]);
        $('#lbMaterias').html(this.arraydv114[9]);
        $('#lbReq').html(this.arraydv114[10]);
        $('#btReglamento').prop('disabled', true);

        this.myPage = this.arraydv114[7];

        imgCurso.src = '';

        break;
      }

      case 'ck15': {
        $('#lbTitulo').html(this.arraydv115[0]);
        $('#lbDesc').html(this.arraydv115[1]);
        $('#lbCosto').html(this.arraydv115[5]);
        $('#lbApoyo').html(this.arraydv115[6]);
        $('#lbDate1').html(this.arraydv115[3]);
        $('#lbDate2').html(this.arraydv115[4]);
        $('#lbTime').html(this.arraydv115[2]);
        $('#lbMaterias').html(this.arraydv115[9]);
        $('#lbReq').html(this.arraydv115[10]);
        $('#btReglamento').prop('disabled', true);

        this.myPage = this.arraydv115[7];

        imgCurso.src = '';

        break;
      }

      case 'ck20': {
        $('#lbTitulo').html(this.arraydv310[0]);
        $('#lbDesc').html(this.arraydv310[1]);
        $('#lbCosto').html(this.arraydv310[5]);
        $('#lbApoyo').html(this.arraydv310[6]);
        $('#lbDate1').html(this.arraydv310[3]);
        $('#lbDate2').html(this.arraydv310[4]);
        $('#lbTime').html(this.arraydv310[2]);
        $('#lbMaterias').html(this.arraydv310[9]);
        $('#lbReq').html(this.arraydv310[10]);
        $('#btReglamento').prop('disabled', true);

        this.myPage = this.arraydv310[7];

        imgCurso.src =
          './../../assets/Imagenes/Programa preparatoria/programa-preparatoria-primera-generacion-monterrey.jpg';

        break;
      }

      case 'ck30': {
        $('#lbTitulo').html(this.arraydv210[0]);
        $('#lbDesc').html(this.arraydv210[1]);
        $('#lbCosto').html(this.arraydv210[5]);
        $('#lbApoyo').html(this.arraydv210[6]);
        $('#lbDate1').html(this.arraydv210[3]);
        $('#lbDate2').html(this.arraydv210[4]);
        $('#lbTime').html(this.arraydv210[2]);
        $('#lbMaterias').html(this.arraydv210[9]);
        $('#lbReq').html(this.arraydv210[10]);
        $('#btReglamento').prop('disabled', true);

        this.myPage = this.arraydv210[7];

        imgCurso.src =
          './../../assets/Imagenes/Programa preparatoria/programa-preparatoria-primera-generación-querétaro.jpg';

        break;
      }
    }
  }
}
