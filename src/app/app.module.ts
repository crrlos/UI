import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EquipoChildComponent } from './componentes/presupuesto/equipo-child/equipo-child.component';
import { AreaComponent } from './componentes/presupuesto/area/area.component';
import { SpinnerModule } from 'primeng/spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './componentes/equipos/equipos.component';
import { MaterialesComponent } from './componentes/materiales/materiales.component';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';
const appRoutes: Routes = [
  { path: 'materiales', component: MaterialesComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'presupueto', component: AreaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EquipoChildComponent,
    AreaComponent,
    MaterialesComponent,
    EquiposComponent
  ],
  imports: [
    MultiSelectModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
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
