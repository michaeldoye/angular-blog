import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { AdminModule } from './admin/admin.module';
import { LoadingOverlayComponent } from '../core/loading-overlay/loading-overlay.component';
import { AdminAuthGuard } from './utils/admin-auth.gaurd';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PagesModule,
    AdminModule,
    SharedModule
  ],
  entryComponents: [],
  providers: [AdminAuthGuard]
})
export class ClientModule { }
