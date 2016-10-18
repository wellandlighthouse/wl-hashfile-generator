import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {SelectModule} from 'ng2-select'

import { AppComponent } from './app.component';
import { HasherComponent } from './hasher/hasher.component';
import { FieldMapperComponent } from './hasher/field-mapper/field-mapper.component';
import { UploaderComponent } from './hasher/uploader/uploader.component';
import { WlWizardComponent } from './wl-wizard/wl-wizard.component';
import { WlWizardStepComponent } from './wl-wizard/wl-wizard-step/wl-wizard-step.component';

import { CsvDataService, HasherService } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    HasherComponent,
    FieldMapperComponent,
    UploaderComponent,
    WlWizardComponent,
    WlWizardStepComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SelectModule
  ],
  providers: [
    CsvDataService,
    HasherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
