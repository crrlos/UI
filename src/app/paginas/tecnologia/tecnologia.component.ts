import { Component, OnInit, ViewChild } from '@angular/core';
import { Tecnologia} from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologia.component.html'
})
export class TecnologiaComponent implements OnInit {

  constructor(private http: HttpService) { }
  tecnologia: Tecnologia;
  displayDialog = false;
  nuevotecnologia = false;
  tecnologiaSeleccionado: Tecnologia;

  @ViewChild('tecnologias_tabla') tecnologias_tabla: TecnologiasTabla;

  ngOnInit() {
  }
  showDialogToAdd() {
    this.nuevotecnologia = true;
    this.tecnologia = {};
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevotecnologia = false;
    this.tecnologia = JSON.parse(JSON.stringify(event));
    this.displayDialog = true;
  }
  save() {

    if (this.nuevotecnologia) {
      this.http.tecnologias_guardar(this.tecnologia).subscribe((res) => {
        this.tecnologia.tecnologia_id = JSON.parse(JSON.stringify(res)).id;
        this.tecnologias_tabla.tecnologias.push(this.tecnologia);
        swal('Correcto!', 'Registro agregado!', 'success');
      });
    } else {
      this.http.tecnologias_actualizar(this.tecnologia).subscribe(() => {
        const i = this.tecnologias_tabla.tecnologias.findIndex(et => et.tecnologia_id === this.tecnologia.tecnologia_id);
        this.tecnologias_tabla.tecnologias[i] = this.tecnologia;
        swal('Correcto!', 'Registro actualizado!', 'success');
      });
    }
    this.displayDialog = false;
  }

  delete(id: number) {
    this.http.tecnologias_eliminar(id).subscribe(() => {
      this.tecnologias_tabla.tecnologias.splice(this.tecnologias_tabla.tecnologias.indexOf(this.tecnologiaSeleccionado), 1);
      swal('Correcto!', 'Registro eliminado!', 'success');
    }, () => {
      swal ( 'Oops' ,  'Este registro no se pudo eliminar' ,  'error' );

    });
    this.displayDialog = false;
  }

}
export interface TecnologiasTabla {
  tecnologias: Tecnologia[];
}

