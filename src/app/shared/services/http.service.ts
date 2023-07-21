import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  env = environment;

  constructor(
    @Inject("route") protected route: string,
    protected http: HttpClient,
  ) { }

  getAsync(): Observable<T> {
    return this.http.get<T>(`${this.env.API_URL}/${this.route}`);
  }
}
