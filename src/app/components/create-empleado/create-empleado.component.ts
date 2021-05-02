import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css'],
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submited = false;

  constructor(private _location: Location, private _form: FormBuilder) {
    this.createEmpleado = this._form.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
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

    console.log(empleado);
  }
  ngOnInit(): void {}

  goBack() {
    this._location.back();
  }
}
