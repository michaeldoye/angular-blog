import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuillEditorModule } from 'ngx-quill-editor';

import { MaterialModule } from '../../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewPostDialog } from './posts/new-post/new-post.dialog.component';

@NgModule({
  declarations: [
    DashboardComponent, 
    PostsComponent, 
    NewPostDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    QuillEditorModule
  ],
  entryComponents: [NewPostDialog],
  providers: []
})
export class AdminModule { }
