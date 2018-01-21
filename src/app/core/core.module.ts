import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material.module';
import { AdminComponent } from './admin/admin.component';
import { ScrollbarModule } from './scrollbar/scrollbar.module';
import { SharedModule } from '../shared/shared.module';
import { FrontendComponent } from './frontend/frontend.component';

@NgModule({
  declarations: [AdminComponent, FrontendComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ScrollbarModule,
    FlexLayoutModule,
    SharedModule
  ],
  entryComponents: [],
  providers: []
})
export class CoreModule { }
