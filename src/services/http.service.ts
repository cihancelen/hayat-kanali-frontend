import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators/map";
import { StaticInfo } from '../classes/static-info';
import { catchError, finalize } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import 'rxjs/add/operator/finally';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpService {

  constructor(
    private http: Http,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {
    let token = localStorage.getItem('token');

    if (token) {
      this.changeHeader(token);
    }
  }

  url: string = StaticInfo.api_url;
  public header: Headers = new Headers();

  get(url: string): Observable<any> {
    this.loaderService.setShowLoader(true);
    // this.changeHeader();

    return this.http.get(this.url + url,
      { headers: this.header })

      .pipe(
        map(data => data.json()),
        catchError(err => {
          this.loaderService.setShowLoader(false);
          return new ErrorObservable(err);
        }),
        finalize(() => {
          this.loaderService.setShowLoader(false);
        })
      );
  }

  post(url: string, obj: any): Observable<any> {
    this.loaderService.setShowLoader(true);
    // this.changeHeader();

    return this.http.post(this.url + url, obj,
      { headers: this.header })
      .pipe(
        map(data => data.json()),
        finalize(() => {
          this.loaderService.setShowLoader(false);
        })
      );
  }

  login(email: string, password: string, login_type = ''): Observable<any> {
    this.loaderService.setShowLoader(true);

    let user = 'grant_type=password&username=' + email + '&password=' + password + '&login_type=' + login_type;
    this.changeHeader();

    let result = this.http.post(StaticInfo.base_url + 'token', user)
      .pipe(
        map(x => x.json()),
        catchError(err => {
          this.print_error(err.json())
          this.loaderService.setShowLoader(false);
          return new Observable;
        }),
        finalize(() => {
          this.loaderService.setShowLoader(false);
        })
      );

    return result;
  }

  register(data: any): Observable<any> {
    this.loaderService.setShowLoader(true);

    return this.http.post(this.url + 'auth/registerUser', data)
      .pipe(
        map(x => x.json()),
        finalize(() => this.loaderService.setShowLoader(false))
      );
  }

  print_error(err) {
    if (err.error == 'Wrong Pass')
      this.notificationService.notification(err.error_description);
    if (err.error == 'Not Found User')
      this.notificationService.notification(err.error_description);
    if (err.error == 'Not Found Hospital')
      this.notificationService.notification(err.error_description);
    if (err.error == 'Not Found Employee')
      this.notificationService.notification(err.error_description);
  }

  changeHeader(token = null): void {
    this.header.delete('Authorization');
    this.header.append('Authorization', 'Bearer ' + token);
    localStorage.setItem('token', token);
  }
}