import { Component, OnInit, ViewChild } from '@angular/core';
import { UnidadMedida } from 'src/app/interfaces/interfaces';
import { UnidadHttpService } from 'src/app/servicios/http/unidad.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html'
})
export class UnidadComponent implements OnInit {

  constructor(private http: UnidadHttpService) { }
  unidad: UnidadMedida;
  displayDialog = false;
  nuevaUnidad = false;
  unidadSeleccionada: UnidadMedida;

  @ViewChild('unidades_tabla') unidades_tabla: UnidadesTabla;

  ngOnInit() {
  }
  showDialogToAdd() {
    this.nuevaUnidad = true;
    this.unidad = {};
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevaUnidad = false;
    this.unidad = JSON.parse(JSON.stringify(event));
    this.displayDialog = true;
  }
  save() {

    if (this.nuevaUnidad) {
      this.http.guardar(this.unidad).subscribe((res: any) => {
        this.unidad.unidad_medida_id = res.id;
        this.unidades_tabla.unidades.push(this.unidad);
        swal('Correcto!', 'Registro agregado!', 'success');
      });
    } else {
      this.http.actualizar(this.unidad).subscribe(() => {
        const i = this.unidades_tabla.unidades.findIndex(et => et.unidad_medida_id === this.unidad.unidad_medida_id);
        this.unidades_tabla.unidades[i] = this.unidad;
        swal('Correcto!', 'Registro actualizado!', 'success');
      });
    }
    this.displayDialog = false;
  }

  delete(id: number) {
    this.http.eliminar(id).subscribe(() => {
      this.unidades_tabla.unidades.splice(this.unidades_tabla.unidades.indexOf(this.unidadSeleccionada), 1);
      swal('Correcto!', 'Registro eliminado!', 'success');
    }, () => {
      swal ( 'Oops' ,  'Este registro no se pudo eliminar' ,  'error' );

    });
    this.displayDialog = false;
  }

}
export interface UnidadesTabla {
  unidades: UnidadMedida[];
}

