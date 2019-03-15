import { Component, OnInit, ViewChild } from '@angular/core';
import { Marca } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html'
})
export class MarcasComponent implements OnInit {

  constructor(private http: HttpService) { }
  marca: Marca;
  displayDialog = false;
  nuevomarca = false;
  marcaSeleccionada: Marca;

  @ViewChild('marcas_tabla') marcas_tabla: MarcasTabla;

  ngOnInit() {
  }
  showDialogToAdd() {
    this.nuevomarca = true;
    this.marca = {};
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevomarca = false;
    this.marca = JSON.parse(JSON.stringify(event));
    console.log(this.marca);
    this.displayDialog = true;
  }
  save() {

    if (this.nuevomarca) {
      this.http.marcas_guardar(this.marca).subscribe((res) => {
        this.marca.marca_id = JSON.parse(JSON.stringify(res)).id;
        this.marcas_tabla.marcas.push(this.marca);
        swal('Correcto!', 'Registro agregado!', 'success');
      });
    } else {
      this.http.marcas_actualizar(this.marca).subscribe(() => {
        const i = this.marcas_tabla.marcas.findIndex(et => et.marca_id === this.marca.marca_id);
        this.marcas_tabla.marcas[i] = this.marca;
        swal('Correcto!', 'Registro actualizado!', 'success');
      });
    }
    this.displayDialog = false;
  }

  delete(id: number) {
    this.http.marcas_eliminar(id).subscribe(() => {
      this.marcas_tabla.marcas.splice(this.marcas_tabla.marcas.indexOf(this.marcaSeleccionada), 1);
      swal('Correcto!', 'Registro eliminado!', 'success');
    }, () => {
      swal ( 'Oops' ,  'Este registro no se pudo eliminar' ,  'error' );

    });
    this.displayDialog = false;
  }

}
export interface MarcasTabla {
  marcas: Marca[];
}

