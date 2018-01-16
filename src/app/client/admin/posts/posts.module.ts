import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuillEditorModule } from 'ngx-quill-editor';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PostsComponent } from './posts.component';
import { LoadingOverlayComponent } from '../../../core/loading-overlay/loading-overlay.component';
import { TimeAgoPipe } from '../../utils/time-ago.pipe';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MaterialModule } from '../../../material.module';

@NgModule({
  declarations: [
    PostsComponent,
    LoadingOverlayComponent,
    TimeAgoPipe,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    QuillEditorModule,
    FlexLayoutModule
  ],
  entryComponents: [],
  providers: []
})
export class PostsModule { }
