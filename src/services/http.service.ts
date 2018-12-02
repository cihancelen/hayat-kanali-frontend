import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators/map";
import { StaticInfo } from '../classes/static-info';

@Injectable()
export class HttpService {

  constructor(
    private http: Http
  ) { }

  url: string = StaticInfo.url;
  

  get(url: string): Observable<any> {
    return this.http.get(this.url + url)
      .pipe(
        map(data => data.json())
      );
  }

  post(url: string, obj: any): Observable<any> {
    return this.http.post(this.url + url, obj)
      .pipe(
        map(data => data.json())
      );
  }

  login(data): Observable<any> {
    return this.http.post(this.url, data)
      .pipe(
        map(x => x.json())
      );
  }
}