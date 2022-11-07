import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Estudiante } from "../interfaces/estudiante";
import { IFormBuilder } from "@rxweb/types";
import { cedula } from '../core/helpers/validators';

export class Students implements Estudiante{
  id: number | undefined;
  nombre: string;
  apellidos: string;
  identificacion: string;
  edad: number;

  public formulario: FormGroup  | undefined;

  constructor(){
    this.id= undefined;
    this.nombre="";
    this.apellidos= "";
    this.identificacion="";
    this.edad=0;
  }

  public static instanceNewStudent(data:any){
    const newStudent = new Students();
    newStudent.id = data['id'] || newStudent.id;
    newStudent.nombre = data['nombre'] || newStudent.nombre;
    newStudent.apellidos = data['apellidos'] || newStudent.apellidos;
    newStudent.identificacion = data['identificacion'] || newStudent.identificacion;
    newStudent.edad = data['edad']|| newStudent.edad;
    return newStudent;
  }

  formBuilder(formBuilder: FormBuilder) {
    const fb = formBuilder as IFormBuilder;
    this.formulario = fb.group<Estudiante>({
      id:[this.id],
      nombre:[this.nombre],
      apellidos:[this.apellidos],
      identificacion:[this.identificacion, [Validators.required, cedula()]],
      edad:[this.edad]
    });
    return this.formulario;
  }
}
