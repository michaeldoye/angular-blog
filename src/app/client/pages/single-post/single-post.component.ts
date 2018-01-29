import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../shared/services/posts.service';
import { Post } from '../../admin/posts/posts.component';
import { routeAnimation } from '../../../route.animation';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})
export class SinglePostComponent implements OnInit {

  post: Post
  isLoading: boolean = true;

  constructor(
    private ar: ActivatedRoute, 
    private postService: PostsService
  ) { }

  ngOnInit() {
    let id = this.ar.snapshot.paramMap.get('id');
    this.postService.getPosts().subscribe(data => {
      this.post = data.filter((post: Post) => post.id == id)[0];
      this.isLoading = false;
      this.post.content = this.postService.renderContent(this.post.content);
    })
  }

}
