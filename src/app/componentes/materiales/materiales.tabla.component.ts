import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Material } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';


@Component({
  selector: 'app-materiales-tabla',
  templateUrl: './materiales.tabla.component.html'
})
export class MaterialesTablaComponent implements OnInit {

  constructor(private http: HttpService) { }
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
      { field: 'material_codigo', header: 'codigo' },
      { field: 'material_nombre', header: 'nombre' },
      { field: 'material_precio', header: 'precio' },
      { field: 'marca', header: 'marca' },
      { field: 'tipo', header: 'tipo' },
      { field: 'unidad_medida', header: 'unidad' }
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
      this.totalRecords = data.totalRecords;
    });
  }

}
