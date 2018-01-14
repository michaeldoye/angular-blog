import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { routeAnimation } from '../../../route.animation';
import { Observable } from 'rxjs/Observable';
import { NewPostDialog } from './new-post/new-post.dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})

export class PostsComponent {
  displayedColumns = ['id', 'title', 'author', 'dateAdded'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;

  constructor(private afs: AngularFirestore, public dialog: MatDialog) {

    this.itemDoc = afs.doc<any>('users/wzHVrPlC7HsARVh6IWBQ');
    this.itemDoc.valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(NewPostDialog, {
      width: '750px',
      data: { name: 'test' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}