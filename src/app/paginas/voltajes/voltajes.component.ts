import { Component, OnInit } from '@angular/core';
import { Voltaje } from 'src/app/interfaces/interfaces';
import { ConfirmationService } from 'primeng/api';
import { VoltajesHttpService } from 'src/app/servicios/http/voltajes.service';
declare var swal : any;
@Component({
  selector: 'app-voltajes',
  templateUrl: './voltajes.component.html'
})
export class VoltajesComponent implements OnInit {

  constructor(
    private http: VoltajesHttpService,
    private confirmationService: ConfirmationService
  ) {}

  invalid = false;
  voltaje: Voltaje;
  displayDialog = false;
  nuevoGas = false;
  voltajeSeleccionado: Voltaje;

  data: Voltaje[] = [];

  ngOnInit(): void {
    this.http.filtrar().subscribe((data) => {
      data.voltajes.forEach((m) => {
        this.data.push(m);
      });
    });
  }

  tableConfiguration = {
    globalFilterFields: ["nombre"],
    columns: [{ field: "nombre", header: "Voltaje" }],
    http: this.http,
    data: this.data,
  };


  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(voltaje: Voltaje) {
    this.resetState(voltaje, false);
  }

  showDialogToDelete(voltaje: Voltaje) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(voltaje);
      },
    });
  }

  resetState(voltaje: Voltaje, esNuevoVoltaje: boolean) {
    this.invalid = false;
    this.nuevoGas = esNuevoVoltaje;
    this.voltaje = voltaje;
    this.displayDialog = true;
  }

  
 
  save() {
    
    if (this.voltaje.nombre == null || this.voltaje.nombre.length == 0) {
      this.invalid = true;
      return;
    }

    if (this.nuevoGas) {
      this.http.guardar(this.voltaje).subscribe((res) => {
        this.voltaje.id = JSON.parse(JSON.stringify(res)).id;
        this.data.push(this.voltaje);
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.http.actualizar(this.voltaje).subscribe(() => {
        const i = this.data.findIndex((et) => et.id === this.voltaje.id);
        this.data[i] = this.voltaje;
        swal("Correcto!", "Registro actualizado!", "success");
      });
    }
    this.displayDialog = false;
  }

  delete(voltaje: Voltaje) {
    this.http.eliminar(voltaje.id).subscribe(
      () => {
        this.data.splice(this.data.indexOf(voltaje), 1);
        swal("Correcto!", "Registro eliminado!", "success");
      },
      () => {
        swal("Oops", "Este registro no se pudo eliminar", "error");
      }
    );
    this.displayDialog = false;
  }
}