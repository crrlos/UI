import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { SpinnerModule } from 'primeng/spinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {KeyFilterModule} from 'primeng/keyfilter';
import {FieldsetModule} from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import {TooltipModule} from 'primeng/tooltip';
@NgModule({
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
    SpinnerModule,
    ScrollPanelModule,
    ConfirmDialogModule,
    ToastModule,
    KeyFilterModule,
    FieldsetModule,
    TabViewModule,
    TooltipModule
  ], providers: [ConfirmationService, MessageService]
})
export class PrimengModule { }
