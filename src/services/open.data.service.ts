import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class OpenDataService {

  constructor(
    private httpServive: HttpService
  ) {}

  getBloodGroups(): Observable<any> {
    return this.httpServive.get('open/getbloodgroups');
  }

  getDiseases(): Observable<any> {
    return this.httpServive.get('open/getdiseases');
  }
}