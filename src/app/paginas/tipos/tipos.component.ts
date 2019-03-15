import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoUnidad as Tipo } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html'
})
export class TiposComponent implements OnInit {

  constructor(private http: HttpService) { }
  tipo: Tipo;
  displayDialog = false;
  nuevotipo = false;
  tipoSeleccionado: Tipo;

  @ViewChild('tipos_tabla') tipos_tabla: TiposTabla;

  ngOnInit() {
  }
  showDialogToAdd() {
    this.nuevotipo = true;
    this.tipo = {};
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevotipo = false;
    this.tipo = JSON.parse(JSON.stringify(event));
    console.log(this.tipo);
    this.displayDialog = true;
  }
  save() {

    if (this.nuevotipo) {
      this.http.tipos_guardar(this.tipo).subscribe((res) => {
        this.tipo.tipo_id = JSON.parse(JSON.stringify(res)).id;
        this.tipos_tabla.tipos.push(this.tipo);
        swal('Correcto!', 'Registro agregado!', 'success');
      });
    } else {
      this.http.tipos_actualizar(this.tipo).subscribe(() => {
        const i = this.tipos_tabla.tipos.findIndex(et => et.tipo_id === this.tipo.tipo_id);
        this.tipos_tabla.tipos[i] = this.tipo;
        swal('Correcto!', 'Registro actualizado!', 'success');
      });
    }
    this.displayDialog = false;
  }

  delete(id: number) {
    this.http.tipos_eliminar(id).subscribe(() => {
      this.tipos_tabla.tipos.splice(this.tipos_tabla.tipos.indexOf(this.tipoSeleccionado), 1);
      swal('Correcto!', 'Registro eliminado!', 'success');
    }, () => {
      swal ( 'Oops' ,  'Este registro no se pudo eliminar' ,  'error' );

    });
    this.displayDialog = false;
  }

}
export interface TiposTabla {
  tipos: Tipo[];
}

