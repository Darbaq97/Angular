import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { ListadoEstudianteComponent } from './components/listado-estudiante/listado-estudiante.component';
import { AgregarEditarEstudianteComponent } from './components/agregar-editar-estudiante/agregar-editar-estudiante.component';
import { VerEstudianteComponent } from './components/ver-estudiante/ver-estudiante.component';


const routes: Routes = [
  {path:'', redirectTo:'listEstudiantes', pathMatch: 'full'},
  {path:'listEstudiantes', component: ListadoEstudianteComponent},
  {path:'agregarEstudiante', component: AgregarEditarEstudianteComponent},
  {path:'verEstudiante/:id', component: VerEstudianteComponent},
  {path:'editarEstudiante/:id', component: AgregarEditarEstudianteComponent},
  {path:'**', redirectTo:'listEstudiantes', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
