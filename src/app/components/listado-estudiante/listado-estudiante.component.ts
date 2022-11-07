import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Estudiante } from '../../interfaces/estudiante';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AgregarEditarEstudianteComponent } from '../agregar-editar-estudiante/agregar-editar-estudiante.component';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-listado-estudiante',
  templateUrl: './listado-estudiante.component.html',
  styleUrls: ['./listado-estudiante.component.css']
})

export class ListadoEstudianteComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre','apellidos','identificacion','edad','acciones'];
  dataSource = new MatTableDataSource<Estudiante>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //dataSource:MatTableDataSource<Estudiante>

  constructor(public dialog: MatDialog, private _estudianteService:EstudianteService) {

   }

  ngOnInit(): void {
    this.obtenerStudents();
  }

  /*
  get listEstudiantes(){
    return this.estudianteService.estudiantes;
  }
*/
  paginacion(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel= 'Items por pagina'
  }

  ngAfterViewInit() {
    this.paginacion()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerStudents(){

     this._estudianteService.getEstudiantes().subscribe(data => {
       this.dataSource.data = data;
     })
  }

  dataSourceRefresh(){
    this.dataSource = new MatTableDataSource<Estudiante>();
    this.paginacion()
  }


  agregarEstudiantes(){
    const dialogRef = this.dialog.open(AgregarEditarEstudianteComponent, {
      width: '750px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log("result",result);
      if(result) this.dataSourceRefresh()
    })
  }

  editar(registro:any){
    const dialogRef = this.dialog.open(AgregarEditarEstudianteComponent, {
      width: '750px',
      data:{...registro, canEdit:true}
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log("result",result);
      if(result) this.dataSourceRefresh()
    })
  }

  verEstudiante(registro:any){
    const dialogRef = this.dialog.open(AgregarEditarEstudianteComponent, {
      width: '750px',
      data:{...registro, canEdit:false}
    });
  }

}

