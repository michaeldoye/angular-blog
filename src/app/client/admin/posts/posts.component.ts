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
  dataSource: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  allPosts: Post[] = [];
  allData: any;
  isLoading: boolean = true;

  constructor(private afs: AngularFirestore, public dialog: MatDialog) {

    this.itemDoc = afs.doc<any>('users/wzHVrPlC7HsARVh6IWBQ');
    this.itemDoc.valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.posts);
      this.allPosts = data.posts;
      this.allData = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  openDialog(rowData?: Post): void {
    let dialogRef = this.dialog.open(NewPostDialog, {
      width: '750px',
      data: { formData: rowData ? rowData : '', categories: this.allData.categories, tags: this.allData.tags }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.isLoading = true;
      this.allPosts.push(result);
      let post = {posts: this.allPosts};
      this.itemDoc.update(post).then(() => this.isLoading = false);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface Post {
  title: string;
  content: string;
  dateAdded: Date;
  author: string;
  categories?: Array<string>;
  tags?: Array<string>
}