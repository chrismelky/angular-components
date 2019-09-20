import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DualMultiselectComponent} from './dualmultiselect/dual-multiselect.component';
import {AngularMaterialModule} from '../core/angular.material.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    DualMultiselectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    DualMultiselectComponent
  ],
})
export class SharedModule {
}
