import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { routeAnimation } from '../../../../route.animation';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]  
})

export class AddPostComponent implements OnInit {

  postForm: FormGroup;
  postDate: Date = new Date();

  user: any = this.ls.get('user');
  isLoading: boolean = false;

  editor;
  editorContent = `<h3>I am Example content</h3>`;
  editorOptions = {
    placeholder: "insert content..."
  };  

  postsRef: AngularFireObject<any>;
  postCats: any;
  postTags: any;
  allPosts: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private db: AngularFireDatabase,
    private ls: LocalStorageService,
    private sb: MatSnackBar,) {

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

  ngOnInit() {
    this.postsRef = this.db.object(`users/${this.user.uid}`);
    this.postsRef.valueChanges().subscribe((data:any) => {
      if (data) {
        this.allPosts = data.posts;
        this.postCats = data.categories;
        this.postTags = data.tags;
      }
      this.isLoading = false;
    },
    (error) => {
      this.isLoading = false;
    });    
  }

  addNewPost(result: any): void {
    if(!result) return;
    this.isLoading = true;
    this.allPosts.push(result);
    let post: any = {posts: this.allPosts};
    this.postsRef.update(post).then(() => {
      this.isLoading = false;
      this.sb.open('Your post has been added!', '', {duration: 5000}); 
    })
    .catch(error => {
      this.sb.open(error.message, '', {duration: 5000});
      this.isLoading = false;
    });
       
  }

  get title() { return this.postForm.get('title') };
  get categories() { return this.postForm.get('categories') };
  get tags() { return this.postForm.get('tags') };
  get status() { return this.postForm.get('status') };  

}
