import { Component, OnInit } from "@angular/core";
import { Marca } from "src/app/interfaces/interfaces";
import { MarcaHttpService } from "src/app/servicios/http/marcas.service";
import { ConfirmationService } from "primeng/api";
declare var swal: any;
@Component({
  selector: "app-marcas",
  templateUrl: "./marcas.component.html",
})
export class MarcasComponent implements OnInit {

  constructor(
    private http: MarcaHttpService,
    private confirmationService: ConfirmationService
  ) {}

  invalid = false;
  marca: Marca;
  displayDialog = false;
  nuevomarca = false;
  marcaSeleccionada: Marca;

  data: Marca[] = [];

  ngOnInit(): void {
    this.http.filtrar().subscribe((data) => {
      data.marcas.forEach((m) => {
        this.data.push(m);
      });
    });
  }

  tableConfiguration = {
    globalFilterFields: ["nombre"],
    columns: [{ field: "nombre", header: "Marca" }],
    http: this.http,
    route: "marcas",
    data: this.data,
  };


  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(marca: Marca) {
    this.resetState(marca, false);
  }

  showDialogToDelete(marca: Marca) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(marca);
      },
    });
  }

  resetState(marca: Marca, esNuevaMarca: boolean) {
    this.invalid = false;
    this.nuevomarca = esNuevaMarca;
    this.marca = marca;
    this.displayDialog = true;
  }

  
 
  save() {
    
    if (this.marca.nombre == null || this.marca.nombre.length == 0) {
      this.invalid = true;
      return;
    }

    if (this.nuevomarca) {
      this.http.guardar(this.marca).subscribe((res) => {
        this.marca.id = JSON.parse(JSON.stringify(res)).id;
        this.data.push(this.marca);
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.http.actualizar(this.marca).subscribe(() => {
        const i = this.data.findIndex((et) => et.id === this.marca.id);
        this.data[i] = this.marca;
        swal("Correcto!", "Registro actualizado!", "success");
      });
    }
    this.displayDialog = false;
  }

  delete(marca: Marca) {
    this.http.eliminar(marca.id).subscribe(
      () => {
        this.data.splice(this.data.indexOf(marca), 1);
        swal("Correcto!", "Registro eliminado!", "success");
      },
      () => {
        swal("Oops", "Este registro no se pudo eliminar", "error");
      }
    );
    this.displayDialog = false;
  }
}