import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ResizableModule } from 'angular-resizable-element';

import { PostsComponent } from './posts.component';
import { LoadingOverlayComponent } from '../../../core/loading-overlay/loading-overlay.component';
import { TimeAgoPipe } from '../../utils/time-ago.pipe';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MaterialModule } from '../../../material.module';
import { MarkdownEditorComponent } from '../../../core/markdown-editor/markdown-editor.component';

@NgModule({
  declarations: [
    PostsComponent,
    LoadingOverlayComponent,
    TimeAgoPipe,
    AddPostComponent,
    EditPostComponent,
    MarkdownEditorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ResizableModule
  ],
  entryComponents: [],
  providers: []
})
export class PostsModule { }
