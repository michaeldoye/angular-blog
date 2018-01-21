import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})

export class AddCategoryComponent {

  private _categoryRef: AngularFireObject<any>;
  public categories: Array<any> = [];
  public newCategory: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public uid: any,
    public snackBar: MatSnackBar,
    public confirmDialog: MatDialog,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private db: AngularFireDatabase) {

    this._categoryRef = this.db.object(`users/${this.uid.user}`);
    this._categoryRef.valueChanges().subscribe(data => {
      if (data.categories) {
        this.categories = data.categories;
      }
    })
  }

  addNewCategory(): void {
    if (this.newCategory !== '') {
      this.categories.push(this.newCategory);
      this._categoryRef.update({categories: this.categories})
        .then(() => this.openSnackBar('Added'))
        .catch((e: Error) => this.openSnackBar(e.message));
    };
  }

  deleteCategory(selectedCategory: string): void {
    const confDialog = this.confirmDialog.open(ConfirmDialogComponent, {
      width:'350px',
      data: {item: selectedCategory}
    });
    confDialog.afterClosed().subscribe(result => {
      if (result) {
        this.categories = this.categories.filter(cat => cat !== selectedCategory);
        this._categoryRef.update({categories: this.categories})
          .then(() => this.openSnackBar('Deleted', 'Undo'))
          .catch((e: Error) => this.openSnackBar(e.message));
      }
    })
  }

  openSnackBar(message: string, action?: string): void {
    let snackBarRef = this.snackBar.open(message, action, {duration: 3000});
    snackBarRef.onAction().subscribe(() => console.log('do action'));
    this.newCategory = '';
  }
}
