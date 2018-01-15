import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { routeAnimation } from '../../../route.animation';
import { Observable } from 'rxjs/Observable';
import { NewPostDialog } from './new-post/new-post.dialog.component';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';


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
  displayedColumns = ['id', 'title', 'author', 'dateAdded', 'status'];
  dataSource: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  allPosts: Post[] = [];
  user: any = this.ls.get('user');

  allData: any;
  isLoading: boolean = true;

  postsRef: AngularFireObject<Post>;
  posts: Observable<Post[]>;

  constructor(
    public dialog: MatDialog, 
    private db: AngularFireDatabase,
    private ls: LocalStorageService
  ) {
    this.postsRef = db.object(`users/${this.user.uid}`);
    this.postsRef.valueChanges().subscribe((data:any) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data.posts);
        this.allPosts = data.posts;
        this.allData = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.isLoading = false;
    },
    (error) => {
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
      let post: any = {posts: this.allPosts};
      this.postsRef.update(post).then(() => this.isLoading = false);
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