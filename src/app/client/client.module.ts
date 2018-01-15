import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { AdminModule } from './admin/admin.module';
import { QuillEditorModule } from 'ngx-quill-editor';
import { LoadingOverlayComponent } from '../core/loading-overlay/loading-overlay.component';
import { AdminAuthGuard } from './utils/admin-auth.gaurd';

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
  providers: [AdminAuthGuard]
})
export class ClientModule { }
