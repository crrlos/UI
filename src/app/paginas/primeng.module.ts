import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AccordionModule} from 'primeng/accordion';
import {FileUploadModule} from 'primeng/fileupload';
import { SpinnerModule } from 'primeng/spinner';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    AccordionModule,
    InputTextareaModule,
    AutoCompleteModule,
    MultiSelectModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    SpinnerModule
  ],
  exports: [
    CommonModule,
    FileUploadModule,
    AccordionModule,
    InputTextareaModule,
    AutoCompleteModule,
    MultiSelectModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    SpinnerModule
  ],
  declarations: []
})
export class PrimengModule { }
