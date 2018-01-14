import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  entryComponents: [],
  providers: []
})
export class CoreModule { }
