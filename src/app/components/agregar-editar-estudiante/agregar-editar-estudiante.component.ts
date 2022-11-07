import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { Students } from 'src/app/models/students.model';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ListadoEstudianteComponent } from '../listado-estudiante/listado-estudiante.component';

@Component({
  selector: 'app-agregar-editar-estudiante',
  templateUrl: './agregar-editar-estudiante.component.html',
  styleUrls: ['./agregar-editar-estudiante.component.css']
})

export class AgregarEditarEstudianteComponent implements OnInit {
  estudentForm:Students;
  canEdit:boolean = true;

  form:FormGroup;
  isEdit:boolean = false;
  constructor(public dialogRef: MatDialogRef<AgregarEditarEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _estudianteService:EstudianteService,
    public fb:FormBuilder) {
      this.estudentForm = new Students;

      if(this.data) {
        this.isEdit = true;
        this.estudentForm = Students.instanceNewStudent(this.data);
        this.canEdit = this.data.canEdit;
      }

      this.form = this.estudentForm.formBuilder(this.fb);
      if(!this.canEdit){
        this.form.controls['nombre'].disable();
        this.form.controls['apellidos'].disable();
        this.form.controls['edad'].disable();
        this.form.controls['identificacion'].disable();
      }
    }

  ngOnInit(): void {
    console.log(this.form.get('identificacion')?.hasError('required'));

  }

  cancelar(){
    this.dialogRef.close();
  }


    /* const nombre = this.form.get('nombre')?.value; */

    // Armamos el objeto

    guardar(){
      this._estudianteService.addEstudiante(this.form.value);
        this.dialogRef.close(true)
      }



  editar(){
    this._estudianteService.editar(this.form.value);
    console.log("estoy editando");
    this.dialogRef.close(true);
  }


/**/



}








