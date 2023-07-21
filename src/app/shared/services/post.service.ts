import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Post } from '../entities/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService extends HttpService<Post>{

  constructor(
    protected override http: HttpClient,
  ) {
    super("posts", http)
  }
}
