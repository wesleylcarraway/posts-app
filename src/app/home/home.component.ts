import { Component } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { lastValueFrom } from 'rxjs';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  data!: any;
  constructor(
    private PostService: PostService
  ){

  }

  async ngOnInit(): Promise<void> {
    this.data = await lastValueFrom(this.PostService.getAsync());
    //console.log(this.data)
  }

}
