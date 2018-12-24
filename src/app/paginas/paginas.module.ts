import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipoChildComponent } from './presupuesto/equipo-child/equipo-child.component';
import { AreaComponent } from './presupuesto/area/area.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EquiposTablaComponent } from './equipos/equipos.tabla.component';
import { MaterialesTablaComponent } from './materiales/materiales.tabla.component';
import { PresupuestoTablaComponent } from './presupuestos/presupuesto.tabla.component';
import { PresupuestoComponent } from './presupuestos/presupuesto.component';
import { PrimengModule } from './primeng.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SharedModule } from '../shared/shared.module';
import { AreaAccordionComponent } from './presupuesto/area/area-accordion.component';

const appRoutes: Routes = [
  { path: 'materiales', component: MaterialesComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'presupuestos', component: PresupuestoComponent },
  { path: 'presupuesto/:id', component: AreaComponent }
];

@NgModule({
  declarations: [
    EquipoChildComponent,
    AreaComponent,
    MaterialesComponent,
    EquiposComponent,
    EquiposTablaComponent,
    MaterialesTablaComponent,
    PresupuestoTablaComponent,
    PresupuestoComponent,
    AreaAccordionComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    FormsModule,
    CommonModule,
    PrimengModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule,
    SharedModule,
    CommonModule
  ]
})
export class PaginasModule { }
