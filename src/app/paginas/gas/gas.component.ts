import { Component, OnInit, ViewChild } from '@angular/core';
import { Gas} from 'src/app/interfaces/interfaces';
import { GasHttpService } from 'src/app/servicios/http/gases.service';
declare var swal;
@Component({
  selector: 'app-gases',
  templateUrl: './gas.component.html'
})
export class GasComponent implements OnInit {

  constructor(private http: GasHttpService) { }
  gas: Gas;
  displayDialog = false;
  nuevogas = false;
  gasSeleccionado: Gas;

  @ViewChild('gas_tabla', { static: true }) gas_tabla: GasTabla;

  ngOnInit() {
  }
  showDialogToAdd() {
    this.nuevogas = true;
    this.gas = {};
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevogas = false;
    this.gas = JSON.parse(JSON.stringify(event));
    this.displayDialog = true;
  }
  save() {

    if (this.nuevogas) {
      this.http.guardar(this.gas).subscribe((res) => {
        this.gas.id = JSON.parse(JSON.stringify(res)).id;
        this.gas_tabla.gases.push(this.gas);
        swal('Correcto!', 'Registro agregado!', 'success');
      });
    } else {
      this.http.actualizar(this.gas).subscribe(() => {
        const i = this.gas_tabla.gases.findIndex(et => et.id === this.gas.id);
        this.gas_tabla.gases[i] = this.gas;
        swal('Correcto!', 'Registro actualizado!', 'success');
      });
    }
    this.displayDialog = false;
  }

  delete(id: number) {
    this.http.eliminar(id).subscribe(() => {
      this.gas_tabla.gases.splice(this.gas_tabla.gases.indexOf(this.gasSeleccionado), 1);
      swal('Correcto!', 'Registro eliminado!', 'success');
    }, () => {
      swal ( 'Oops' ,  'Este registro no se pudo eliminar' ,  'error' );

    });
    this.displayDialog = false;
  }

}
export interface GasTabla {
  gases: Gas[];
}

