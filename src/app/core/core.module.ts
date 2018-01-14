import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material.module';
import { AdminComponent } from './admin/admin.component';
import { ScrollbarModule } from './scrollbar/scrollbar.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ScrollbarModule,
    FlexLayoutModule
  ],
  entryComponents: [],
  providers: []
})
export class CoreModule { }
