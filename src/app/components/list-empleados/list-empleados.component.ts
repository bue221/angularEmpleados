import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css'],
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  public filter: any = '';

  constructor(
    private _empleadosService: EmpleadoService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadosService.obtenerEmpleados().subscribe((data) => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
        // console.log(this.empleados);
      });
    });
  }

  eliminarEmpleado(id: string) {
    this._empleadosService
      .eliminarEmpleado(id)
      .then(() => this._toastr.success('Empleado eliminado con exito'))
      .catch((err) => this._toastr.success('Error al eliminar empleado'));
  }
}
