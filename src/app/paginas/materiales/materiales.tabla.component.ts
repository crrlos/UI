import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Material } from 'src/app/interfaces/interfaces';
import { MaterialHttpService } from 'src/app/servicios/http/material.service';


@Component({
  selector: 'app-materiales-tabla',
  templateUrl: './materiales.tabla.component.html'
})
export class MaterialesTablaComponent implements OnInit {

  constructor(private http: MaterialHttpService) { }
  materiales: Material[] = [];
  material: Material;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Output() material_seleccionado = new EventEmitter<Material>();
  @Output() agregar_material = new EventEmitter<boolean>();
  @Input() puede_agregar;

  ngOnInit() {
    this.cols = [
      { field: 'codigo', header: 'Código' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'marca', header: 'Marca' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'unidadMedida', header: 'Unidad de medida' }
    ];
    this.selectedColumns = this.cols;
  }
  onRowSelect(event: Material) {
    this.material = event;
    this.material_seleccionado.emit(this.material);
  }
  loadLazy(event) {
    this.http.materiales(event).subscribe(data => {
      this.materiales = data.materiales;
      console.log(this.materiales);
      this.totalRecords = data.totalRecords;
    });
  }

}
