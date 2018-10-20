import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EquipoChildComponent } from './presupuesto/equipo-child/equipo-child.component';
import { UbicacionChildComponent } from './presupuesto/ubicacion-child/ubicacion-child.component';
import {SpinnerModule} from 'primeng/spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './equipos/equipos.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { HttpClientModule } from '@angular/common/http';
const appRoutes: Routes = [
  { path: 'materiales', component: MaterialesComponent },
  { path: 'equipos',      component: EquiposComponent },
  { path: 'presupueto',      component: PresupuestoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PresupuestoComponent,
    EquipoChildComponent,
    UbicacionChildComponent,
    MaterialesComponent,
    EquiposComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    AngularFontAwesomeModule,
    SpinnerModule,
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
