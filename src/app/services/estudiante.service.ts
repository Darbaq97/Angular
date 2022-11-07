import { Injectable } from '@angular/core';
import { Estudiante } from '../interfaces/estudiante';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Estudiante/';

    listEstudiantes: Estudiante[] = [
    {id:1, nombre: 'David', apellidos:'Lastre', identificacion:'0959093734', edad:25},
    {id:12, nombre: 'DavidSon', apellidos:'Lastre Baquerizo', identificacion:'0959045600', edad:19},
    {id:13, nombre: 'Jamil', apellidos:'Lastre', identificacion:'0959093734', edad:20},
    {id:14, nombre: 'DavidSon', apellidos:'Lastre Baquerizo', identificacion:'0959045600', edad:29},
    {id:15, nombre: 'David', apellidos:'Lastre', identificacion:'0959093734', edad:24},
    {id:16, nombre: 'DavidSon', apellidos:'Lastre Baquerizo', identificacion:'0959045600', edad:30},
    {id:18, nombre: 'David', apellidos:'Lastre', identificacion:'0959093734', edad:23}
  ];

  //TODO: INYECTAR EL HHTP SERVICES
  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<Estudiante[]>{
     return this.http.get<Estudiante[]>(`${this.myAppUrl}${this.myApiUrl}`);

  }

/*
  guardar(estudiante:Estudiante){
    console.log("test",estudiante);

    this.listEstudiantes.push(estudiante);
  }
*/
  addEstudiante(estudiante: Estudiante): Observable<Estudiante>{
         return this.http.post<Estudiante>(`${this.myAppUrl}${this.myApiUrl}`, estudiante)
  }

  editar(estudiante:Estudiante){
    this.listEstudiantes.map((item, index)=>{
      if(item.identificacion == estudiante.identificacion){
        console.log("estudiante", estudiante);
        console.log("index", index);

        this.listEstudiantes[index] = estudiante;
      }
    })
  }

}
