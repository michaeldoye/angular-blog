import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ScrollbarModule } from './scrollbar/scrollbar.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
