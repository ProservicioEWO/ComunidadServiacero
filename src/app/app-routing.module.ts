import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Calendario } from './calendario/calendario';
import { Conocenos } from './conocenos/conocenos';
import { Galeria } from './galeria/galeria';
import { GaleriaDetalles } from './galeria/galeria-detalles/galeria-detalles.component';
import { LoginAccessGuard } from './guards/login-access.guard';
import { UserAccessGuard } from './guards/user-access.guard';
import { Instalaciones } from './instalaciones/instalaciones';
import { LoginComponent } from './login/login.component';
import { Programas } from './programas/programas';
import { InstalacionesDetalles } from './instalaciones/instalaciones-detalles/instalaciones-detalles.component';
import { ProgramasDetalles } from './programas/programas-detalles/programas-detalles.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginAccessGuard],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserAccessGuard],
    children: [
      { path: 'home/:variable', component: Conocenos },
      { path: 'home', component: Conocenos },
      { path: 'galeria', component: Galeria, children: [{ path: ':variable', component: GaleriaDetalles }] },
      { path: 'programas', component: Programas },
      { path: 'programas/:variable', component: Programas, children: [{ path: ':variable', component: ProgramasDetalles }] },
      { path: 'calendario', component: Calendario },
      { path: 'calendario/:variable', component: Calendario },
      { path: 'instalaciones', component: Instalaciones, children: [{ path: ':variable', component: InstalacionesDetalles }] },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', component: Conocenos }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
