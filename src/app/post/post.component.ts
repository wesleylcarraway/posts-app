import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../shared/services/post.service';
import { Post } from '../shared/entities/post';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  id?: any;
  post!: Post;

  constructor(
    private activatedroute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
  )
  {

  }

  async ngOnInit(): Promise<void> {

    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.post = await lastValueFrom(this.postService.getByIdAsync(this.id));
  }

  navigateToHome(): void {
    this.router.navigate(['home']);
  }

}
