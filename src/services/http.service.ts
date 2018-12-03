import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators/map";
import { StaticInfo } from '../classes/static-info';

@Injectable()
export class HttpService {

  constructor(
    private http: Http
  ) { }

  url: string = StaticInfo.api_url;
  public header: Headers = new Headers();

  get(url: string): Observable<any> {
    return this.http.get(this.url + url,
      { headers: this.header })
      .pipe(
        map(data => data.json())
      );
  }

  post(url: string, obj: any): Observable<any> {
    return this.http.post(this.url + url, obj,
      { headers: this.header })
      .pipe(
        map(data => data.json())
      );
  }

  login(email: string, password: string, login_type = ''): Observable<any> {
    let user = 'grant_type=password&username=' + email + '&password=' + password + '&login_type=' + login_type;

    return this.http.post(StaticInfo.base_url + 'token', user)
      .pipe(
        map(x => x.json())
      );
  }

  register(data: any): Observable<any> {
    return this.http.post(this.url + 'user/registerUser', data)
      .pipe(
        map(x => x.json())
      );
  }
}