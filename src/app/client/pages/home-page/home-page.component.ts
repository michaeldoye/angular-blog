import { Component, OnInit, OnDestroy } from '@angular/core';
import { routeAnimation } from '../../../route.animation';
import { PostsService } from '../../../shared/services/posts.service';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../../admin/posts/posts.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})

export class HomePageComponent implements OnInit, OnDestroy {

  subs: Array<Subscription> = [];
  direction: string = 'row';

  posts: Array<Post> = [];
  isLoading: boolean = true;

  constructor(private postsService: PostsService, private rt: Router) { }

  ngOnInit() {
    this.subs.push(
      this.postsService.getPosts().subscribe(data => {
        this.posts = data.filter((post: Post) => post.status === 'published').reverse();
        this.isLoading = false;
      })
    );
  }

  toggleDirection() {
    this.direction = (this.direction === 'column') ? 'row' : 'column';
  }

  goToPost(post: Post): void {
    this.rt.navigate(['post', post.id, post.title.replace(/\s+/g, '-').toLowerCase()]);
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
