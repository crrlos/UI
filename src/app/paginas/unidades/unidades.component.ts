import { Component, OnInit, ViewChild } from '@angular/core';
import { UnidadMedida } from 'src/app/interfaces/interfaces';
import { UnidadHttpService } from 'src/app/servicios/http/unidad.service';
import { ConfirmationService } from 'primeng/api';
declare var swal : any;
@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html'
})
export class UnidadComponent implements OnInit {

  
  constructor(
    private http: UnidadHttpService,
    private confirmationService: ConfirmationService
  ) {}

  invalid = false;
  unidadMedida: UnidadMedida;
  displayDialog = false;
  nuevaUnidadMedida = false;
  marcaSeleccionada: UnidadMedida;

  data: UnidadMedida[] = [];

  ngOnInit(): void {
    this.http.filtrar().subscribe((data) => {
      data.unidades.forEach((m) => {
        this.data.push(m);
      });
    });
  }

  tableConfiguration = {
    globalFilterFields: ["nombre"],
    columns: [
      { field: "nombre", header: "Unidad" },
      { field: "abreviatura", header: "Abreviatura" },
    ],
    http: this.http,
    data: this.data,
  };


  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(unidadMedida: UnidadMedida) {
    this.resetState(unidadMedida, false);
  }

  showDialogToDelete(unidadMedida: UnidadMedida) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(unidadMedida);
      },
    });
  }

  resetState(unidadMedida: UnidadMedida, esNuevaMarca: boolean) {
    this.invalid = false;
    this.nuevaUnidadMedida = esNuevaMarca;
    this.unidadMedida = unidadMedida;
    this.displayDialog = true;
  }

  
 
  save() {
    
    if (this.unidadMedida.nombre == null || this.unidadMedida.nombre.length == 0) {
      this.invalid = true;
      return;
    }

    if (this.nuevaUnidadMedida) {
      this.http.guardar(this.unidadMedida).subscribe((res) => {
        this.unidadMedida.id = JSON.parse(JSON.stringify(res)).id;
        this.data.push(this.unidadMedida);
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.http.actualizar(this.unidadMedida).subscribe(() => {
        const i = this.data.findIndex((et) => et.id === this.unidadMedida.id);
        this.data[i] = this.unidadMedida;
        swal("Correcto!", "Registro actualizado!", "success");
      });
    }
    this.displayDialog = false;
  }

  delete(unidadMedida: UnidadMedida) {
    this.http.eliminar(unidadMedida.id).subscribe(
      () => {
        this.data.splice(this.data.indexOf(unidadMedida), 1);
        swal("Correcto!", "Registro eliminado!", "success");
      },
      () => {
        swal("Oops", "Este registro no se pudo eliminar", "error");
      }
    );
    this.displayDialog = false;
  }
}