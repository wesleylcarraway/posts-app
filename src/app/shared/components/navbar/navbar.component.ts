import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  data!: any;
  inputValue!: any;

  constructor(
    private postService: PostService,
    private router: Router,
  )
  {
  }

  onKey(event: any) {
    this.inputValue = event.target.value;
  }

  async search(): Promise<void> {
    this.data = await lastValueFrom(this.postService.getAsync());

    const result = this.data.find((element: any) => {
      return element['title'].includes(this.inputValue);
    });

    if(result) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['post', result['id']]);
    }
    else {
      this.router.navigate(['notfound']);
    }
  }
}
