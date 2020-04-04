import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mantenimiento' },
  { path: 'mantenimiento', loadChildren: () => import('./mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule) },
  { path: 'procesos', loadChildren: () => import('./procesos/procesos.module').then(m => m.ProcesosModule) },
  { path: 'consultas', loadChildren: () => import('./consultas/consultas.module').then(m => m.ConsultasModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
