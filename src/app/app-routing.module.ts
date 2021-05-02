import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListEmpleadosComponent },
  { path: 'create', component: CreateEmpleadoComponent },
  { path: 'edit/:id', component: CreateEmpleadoComponent },
  { path: '**', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
