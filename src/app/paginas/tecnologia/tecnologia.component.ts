import { Component, OnInit, ViewChild } from '@angular/core';
import { Tecnologia} from 'src/app/interfaces/interfaces';
import { TecnologiaHttpService } from 'src/app/servicios/http/tecnologias.service';
declare var swal;
@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologia.component.html'
})
export class TecnologiaComponent implements OnInit {

  constructor(private http: TecnologiaHttpService) { }
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
      this.http.guardar(this.tecnologia).subscribe((res) => {
        this.tecnologia.id = JSON.parse(JSON.stringify(res)).id;
        this.tecnologias_tabla.tecnologias.push(this.tecnologia);
        swal('Correcto!', 'Registro agregado!', 'success');
      });
    } else {
      this.http.actualizar(this.tecnologia).subscribe(() => {
        const i = this.tecnologias_tabla.tecnologias.findIndex(et => et.id === this.tecnologia.id);
        this.tecnologias_tabla.tecnologias[i] = this.tecnologia;
        swal('Correcto!', 'Registro actualizado!', 'success');
      });
    }
    this.displayDialog = false;
  }

  delete(id: number) {
    this.http.eliminar(id).subscribe(() => {
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

