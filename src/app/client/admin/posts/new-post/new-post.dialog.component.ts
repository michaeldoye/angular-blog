import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'new-post-dialog',
  templateUrl: 'new-post-dialog.html',
})

export class NewPostDialog {

  postForm: FormGroup;
  postDate: Date = new Date();

  editor;
  editorContent = `<h3>I am Example content</h3>`;
  editorOptions = {
    placeholder: "insert content..."
  };

  user: any = this.ls.get('user');

  constructor(
    public dialogRef: MatDialogRef<NewPostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private ls: LocalStorageService
  ){
    this.postForm = fb.group({
      'title': ['', [Validators.required, Validators.minLength(5)]],
      'content': ['<h3>I am Example content</h3>', Validators.minLength(10)],
      'author': this.user.displayName,
      'dateAdded': this.postDate,
      'categories': ['', Validators.required],
      'tags': ['', Validators.required],
      'status': ['draft', Validators.required]
    });
  }

  addNewPost(data) {
    this.postForm.reset();
    this.dialogRef.close(data);
  }

  get title() { return this.postForm.get('title') };
  get categories() { return this.postForm.get('categories') };
  get tags() { return this.postForm.get('tags') };
  get status() { return this.postForm.get('status') };  
}