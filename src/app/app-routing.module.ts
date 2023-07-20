import { Calendario } from './calendario/calendario';
import { Conocenos } from './conocenos/conocenos';
import { Galeria } from './galeria/galeria';
import { Instalaciones } from './instalaciones/instalaciones';
import { LoginAccessGuard } from './guards/login-access.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Programas } from './programas/programas';
import { RouterModule, Routes } from '@angular/router';
import { UserAccessGuard } from './guards/user-access.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginAccessGuard]
  },
  {
    path: '',
    canActivate: [UserAccessGuard],
    children: [
      { path: 'home/:variable', component: Conocenos },
      { path: 'home', component: Conocenos },
      { path: 'galeria', component: Galeria },
      { path: 'galeria/:variable', component: Galeria },
      { path: 'programas', component: Programas },
      { path: 'programas/:variable', component: Programas },
      { path: 'calendario', component: Calendario },
      { path: 'calendario/:variable', component: Calendario },
      { path: 'instalaciones', component: Instalaciones },
      { path: 'instalaciones/:variable', component: Instalaciones },
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
