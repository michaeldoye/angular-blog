import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'new-post-dialog',
  templateUrl: 'new-post-dialog.html',
})
export class NewPostDialog implements OnInit {

  options: FormGroup;
  postDate: Date = new Date();

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: "insert content..."
  };

  btnOpts: any = {
    active: false,
    text: 'Save Post',
    spinnerSize: 18,
    raised: true,
    buttonColor: 'accent',
    spinnerColor: 'primary'
  }

  constructor(
    public dialogRef: MatDialogRef<NewPostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder
  ) {
      this.options = fb.group({
        'title': '',
        'content': ['<h3>I am Example content</h3>', Validators.min(10)],
        'author': 'some author',
        'dateAdded': this.postDate,
        'categories': '',
        'tags': ''
      });
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewPost(data) {
    this.btnOpts.text = 'Saving...';
    this.btnOpts.active = true;
    this.options.reset();
    this.dialogRef.close(data);
  }

}