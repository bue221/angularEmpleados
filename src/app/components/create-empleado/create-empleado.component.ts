import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css'],
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submited = false;
  loading = false;
  id: string | null;
  title: string = 'Agregar Empleado';

  constructor(
    private _location: Location,
    private _form: FormBuilder,
    private _empleadoService: EmpleadoService,
    private _router: Router,
    private _toastr: ToastrService,
    private _activeR: ActivatedRoute
  ) {
    this.createEmpleado = this._form.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
    this.id = this._activeR.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.getOneEmpleado();
    }
  }

  addEmpleado() {
    this.submited = true;
    if (this.createEmpleado.invalid) {
      return;
    }

    const empleado: any = {
      ...this.createEmpleado.value,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    this.loading = true;

    if (this.id !== null) {
      this.editarEmpleado(empleado);
    } else {
      this.agregarEmpleado(empleado);
    }

    // console.log(empleado);
  }

  agregarEmpleado(empleado: any) {
    this._empleadoService
      .agregarEmpleado({ ...empleado, fechaActualizacion: new Date() })
      .then(() => {
        this.loading = false;
        this._toastr.success('Empleado registrado con exito');
        this._router.navigate(['/list']);
      })
      .catch((err) => {
        this.loading = false;
        this._toastr.error('Error al registrar el empleado');
      });
  }

  editarEmpleado(empleado: any) {
    if (this.id !== null) {
      this._empleadoService
        .actualizarEmpleado(this.id, empleado)
        .then(() => {
          this.loading = false;
          this._toastr.success('Empleado actualizado con exito');
          this._router.navigate(['/list']);
        })
        .catch((err) => {
          this.loading = false;
          this._toastr.error('Error al actualizar el empleado');
        });
    }
  }

  getOneEmpleado() {
    this.title = 'Editar Empleado';
    this.loading = true;
    if (this.id !== null) {
      this._empleadoService.obtenerEmpleado(this.id).subscribe((data) => {
        this.loading = false;
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        });
      });
    }
  }

  goBack() {
    this._location.back();
  }
}
