import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PostService } from '../shared/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  pag : any = 1 ;
  counter : any = 5;
  data!: any;
  constructor(
    private PostService: PostService,
    private router: Router,
  ){

  }

  async ngOnInit(): Promise<void> {
    this.data = await lastValueFrom(this.PostService.getAsync());
  }

  navigateToPostView(postId: any): void {
    this.router.navigate(['post', postId]);
  }



}
