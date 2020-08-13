import { Component, OnInit, ViewChild } from '@angular/core';
import { Tecnologia} from 'src/app/interfaces/interfaces';
import { TecnologiaHttpService } from 'src/app/servicios/http/tecnologias.service';
import { ConfirmationService } from 'primeng/api';
declare var swal;
@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologia.component.html'
})
export class TecnologiaComponent implements OnInit {

  constructor(
    private http: TecnologiaHttpService,
    private confirmationService: ConfirmationService
  ) {}

  invalid = false;
  tecnologia: Tecnologia;
  displayDialog = false;
  nuevaTecnologia = false;
  marcaSeleccionada: Tecnologia;

  data: Tecnologia[] = [];

  ngOnInit(): void {
    this.http.filtrar().subscribe((data) => {
      data.tecnologias.forEach((m) => {
        this.data.push(m);
      });
    });
  }

  tableConfiguration = {
    globalFilterFields: ["nombre"],
    columns: [{ field: "nombre", header: "Tecnología" }],
    http: this.http,
    data: this.data,
  };


  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(tecnologia: Tecnologia) {
    this.resetState(tecnologia, false);
  }

  showDialogToDelete(tecnologia: Tecnologia) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(tecnologia);
      },
    });
  }

  resetState(tecnologia: Tecnologia, esNuevaMarca: boolean) {
    this.invalid = false;
    this.nuevaTecnologia = esNuevaMarca;
    this.tecnologia = tecnologia;
    this.displayDialog = true;
  }

  
 
  save() {
    
    if (this.tecnologia.nombre == null || this.tecnologia.nombre.length == 0) {
      this.invalid = true;
      return;
    }

    if (this.nuevaTecnologia) {
      this.http.guardar(this.tecnologia).subscribe((res) => {
        this.tecnologia.id = JSON.parse(JSON.stringify(res)).id;
        this.data.push(this.tecnologia);
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.http.actualizar(this.tecnologia).subscribe(() => {
        const i = this.data.findIndex((et) => et.id === this.tecnologia.id);
        this.data[i] = this.tecnologia;
        swal("Correcto!", "Registro actualizado!", "success");
      });
    }
    this.displayDialog = false;
  }

  delete(tecnologia: Tecnologia) {
    this.http.eliminar(tecnologia.id).subscribe(
      () => {
        this.data.splice(this.data.indexOf(tecnologia), 1);
        swal("Correcto!", "Registro eliminado!", "success");
      },
      () => {
        swal("Oops", "Este registro no se pudo eliminar", "error");
      }
    );
    this.displayDialog = false;
  }

}