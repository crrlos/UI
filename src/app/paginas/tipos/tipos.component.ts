import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoUnidad as Tipo } from 'src/app/interfaces/interfaces';
import swal from 'sweetalert';
import { TiposHttpService } from 'src/app/servicios/http/tipos.service';
@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html'
})
export class TiposComponent implements OnInit {

  constructor(private http: TiposHttpService) { }
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
      this.http.guardar(this.tipo).subscribe((res) => {
        this.tipo.id = JSON.parse(JSON.stringify(res)).id;
        this.tipos_tabla.tipos.push(this.tipo);
        swal('Correcto!', 'Registro agregado!', 'success');
      });
    } else {
      this.http.actualizar(this.tipo).subscribe(() => {
        const i = this.tipos_tabla.tipos.findIndex(et => et.id === this.tipo.id);
        this.tipos_tabla.tipos[i] = this.tipo;
        swal('Correcto!', 'Registro actualizado!', 'success');
      });
    }
    this.displayDialog = false;
  }

  delete(id: number) {
    this.http.eliminar(id).subscribe(() => {
      this.tipos_tabla.tipos.splice(this.tipos_tabla.tipos.indexOf(this.tipoSeleccionado), 1);
      swal('Correcto!', 'Registro eliminado!', 'success');
    }, () => {
      swal('Oops', 'Este registro no se pudo eliminar', 'error');

    });
    this.displayDialog = false;
  }

}
export interface TiposTabla {
  tipos: Tipo[];
}

