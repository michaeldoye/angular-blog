import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { AdminModule } from './admin/admin.module';
import { QuillEditorModule } from 'ngx-quill-editor';
import { LoadingOverlayComponent } from '../core/loading-overlay/loading-overlay.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PagesModule,
    AdminModule,
    QuillEditorModule
  ],
  entryComponents: [],
  providers: []
})
export class ClientModule { }
