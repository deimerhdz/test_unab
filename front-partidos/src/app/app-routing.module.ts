import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { AuthGuard } from './guards/auth.guard';
import { AddpartidoComponent } from './partidos/addpartido/addpartido.component';
import { ListpartidoComponent } from './partidos/listpartido/listpartido.component';
import { OpcionesComponent } from './partidos/opciones/opciones.component';
import { UpmarcadorComponent } from './partidos/upmarcador/upmarcador.component';

const routes: Routes = [
  { path: '', component:LoginComponent,
  pathMatch: 'full'},
  {path: 'opciones', component:OpcionesComponent,canActivate:[AuthGuard],},
  {path: 'lista', component:ListpartidoComponent,canActivate:[AuthGuard],},
  {path: 'actualizar/:id', component:UpmarcadorComponent,canActivate:[AuthGuard],},
  {path: 'agregar', component:AddpartidoComponent,canActivate:[AuthGuard],},
  {path: 'registro', component:RegistrarComponent},
  {path:"**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
