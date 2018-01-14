import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuillEditorModule } from 'ngx-quill-editor';
import { MatProgressButtons } from 'mat-progress-buttons';

import { MaterialModule } from '../../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewPostDialog } from './posts/new-post/new-post.dialog.component';
import { LoadingOverlayComponent } from '../../core/loading-overlay/loading-overlay.component';
import { TimeAgoPipe } from '../utils/time-ago.pipe';

@NgModule({
  declarations: [
    DashboardComponent, 
    PostsComponent,
    LoadingOverlayComponent,
    NewPostDialog,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuillEditorModule,
    MatProgressButtons,
    
  ],
  entryComponents: [NewPostDialog],
  providers: []
})
export class AdminModule { }
