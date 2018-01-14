import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PagesModule,
    AdminModule
  ],
  entryComponents: [],
  providers: []
})
export class ClientModule { }
