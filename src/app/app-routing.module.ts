import { Component, NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { Galeria } from './galeria/galeria'
import { Programas } from './programas/programas'
import { Conocenos } from './conocenos/conocenos'
import { Instalaciones } from './instalaciones/instalaciones'
import { InstalacionesLeon } from './instalaciones/leon/instalacionesLeon'
import { InstalacionesQueretaro } from './instalaciones/queretaro/instalacionesQueretaro'
import { InstalacionesMonterrey } from './instalaciones/monterrey/instalacionesMonterrey'
import { General } from './galeria/general/general'
import { Calendario } from './calendario/calendario'
import { Familia } from './galeria/familia/familia'
import { Prepa } from './galeria/prepa/prepa'
import { Escuela } from './galeria/escuela/escuela'
import { Kickoff } from './galeria/kickoff/kickoff'
import { LoginComponent } from './login/login.component'
import { LoginAccessGuard } from './guards/login-access.guard'
import { UserAccessGuard } from './guards/user-access.guard'
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginAccessGuard] },
  {
    path: 'home/:variable',
    component: Conocenos,
    canActivate: [UserAccessGuard],
  },
  { path: 'home', component: Conocenos, canActivate: [UserAccessGuard] },
  {
    path: 'galeria',
    component: Galeria,
    children: [
      { path: 'general', component: General },
      { path: 'familia', component: Familia },
      { path: 'prepa', component: Prepa },
      { path: 'escuela', component: Escuela },
      { path: 'kickoff', component: Kickoff },
    ],
    canActivate: [UserAccessGuard],
  },
  { path: 'programas', component: Programas, canActivate: [UserAccessGuard] },
  {
    path: 'programas/:variable',
    component: Programas,
    canActivate: [UserAccessGuard],
  },
  { path: 'calendario', component: Calendario, canActivate: [UserAccessGuard] },
  {
    path: 'calendario/:variable',
    component: Calendario,
    canActivate: [UserAccessGuard],
  },
  {
    path: 'instalaciones',
    component: Instalaciones,
    children: [
      { path: '', component: InstalacionesLeon },
      { path: 'leon', component: InstalacionesLeon },
      { path: 'queretaro', component: InstalacionesQueretaro },
      { path: 'monterrey', component: InstalacionesMonterrey },
    ],
    canActivate: [UserAccessGuard],
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Conocenos, canActivate: [UserAccessGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
