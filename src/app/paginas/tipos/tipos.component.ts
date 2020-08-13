import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoUnidad as Tipo } from 'src/app/interfaces/interfaces';
import swal from 'sweetalert';
import { TiposHttpService } from 'src/app/servicios/http/tipos.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html'
})
export class TiposComponent implements OnInit {

  constructor(
    private http: TiposHttpService,
    private confirmationService: ConfirmationService
  ) {}

  invalid = false;
  tipo: Tipo;
  displayDialog = false;
  nuevoTipo = false;
  marcaSeleccionada: Tipo;

  data: Tipo[] = [];

  ngOnInit(): void {
    this.http.filtrar().subscribe((data) => {
      data.tipos.forEach((m) => {
        this.data.push(m);
      });
    });
  }

  tableConfiguration = {
    globalFilterFields: ["nombre"],
    columns: [{ field: "nombre", header: "Tipo" }],
    http: this.http,
    data: this.data,
  };


  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(tipo: Tipo) {
    this.resetState(tipo, false);
  }

  showDialogToDelete(tipo: Tipo) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(tipo);
      },
    });
  }

  resetState(tipo: Tipo, esNuevaMarca: boolean) {
    this.invalid = false;
    this.nuevoTipo = esNuevaMarca;
    this.tipo = tipo;
    this.displayDialog = true;
  }

  
 
  save() {
    
    if (this.tipo.nombre == null || this.tipo.nombre.length == 0) {
      this.invalid = true;
      return;
    }

    if (this.nuevoTipo) {
      this.http.guardar(this.tipo).subscribe((res) => {
        this.tipo.id = JSON.parse(JSON.stringify(res)).id;
        this.data.push(this.tipo);
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.http.actualizar(this.tipo).subscribe(() => {
        const i = this.data.findIndex((et) => et.id === this.tipo.id);
        this.data[i] = this.tipo;
        swal("Correcto!", "Registro actualizado!", "success");
      });
    }
    this.displayDialog = false;
  }

  delete(tipo: Tipo) {
    this.http.eliminar(tipo.id).subscribe(
      () => {
        this.data.splice(this.data.indexOf(tipo), 1);
        swal("Correcto!", "Registro eliminado!", "success");
      },
      () => {
        swal("Oops", "Este registro no se pudo eliminar", "error");
      }
    );
    this.displayDialog = false;
  }
}

