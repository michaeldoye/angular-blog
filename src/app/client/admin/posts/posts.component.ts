import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { routeAnimation } from '../../../route.animation';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { Router } from '@angular/router';


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
  displayedColumns = ['checkbox', 'id', 'title', 'author', 'dateAdded', 'status', 'action'];
  dataSource: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  allPosts: Array<Post> = [];
  user: any = this.ls.get('user');

  isLoading: boolean = true;
  postsRef: AngularFireObject<Post>;

  checkAll: any;
  selectedPosts: Array<number> = [];

  constructor(
    private db: AngularFireDatabase,
    private ls: LocalStorageService,
    private rt: Router
  ) {
    this.postsRef = db.object(`users/${this.user.uid}`);
    this.postsRef.valueChanges().subscribe((data:any) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data.posts);
        this.allPosts = data.posts;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.isLoading = false;
    },
    (error) => {
      this.isLoading = false;
    });
  }


  /**
    * @desc Filters table rows based on input
    * @param string filterValue - the inputted value to filter by
    * @return void
  */
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  /**
    * @desc Navigates to selected post when clicked
    * @param int postId - the id of the post to navigate to
    * @return void
  */
  editPost(postId: any): void {
    this.rt.navigate(['/admin/posts/edit', postId]);
  }


  /**
    * @desc Check all post checkboxes
    * @param boolean value - value of checkbox
    * @return void
  */
  doCheckAll(value: boolean): void {
    if (value) this.selectedPosts = [];
    this.allPosts.forEach((post: Post) => {
      post.isChecked = value;
      if (value) {
        this.selectedPosts.push(post.id);
      } else {
        this.selectedPosts = [];
      }
    })
  }


  /**
    * @desc Check if all checkboxes are checked
    * @return void
  */
  isAllChecked() {
    return this.allPosts.every((post: Post) => post.isChecked);
  }


  /**
    * @desc Add selected posts to selected posts array
    * @param int id - seleted post id
    * @param boolean isChecked - if the selected post is checked   
    * @return void
  */
  doSinglePostSelection(id: number, isChecked: boolean): void {
    if (isChecked) {
      this.selectedPosts.push(id);
    } else {
      let indx = this.selectedPosts.indexOf(id);
      if (indx > -1) this.selectedPosts.splice(indx, 1);
    }
  }

  doDeleteSelected(): void {}  
}

export interface Post {
  id: any;
  title: string;
  content: string;
  dateAdded: Date;
  author: string;
  categories?: Array<string>;
  tags?: Array<string>,
  status: string;
  isChecked?: boolean;
}