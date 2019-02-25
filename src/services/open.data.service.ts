import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class OpenDataService {

  constructor(
    private httpServive: HttpService
  ) {
    var bg = JSON.parse(localStorage.getItem('blood-groups'));
  }

  private bloodGroupsSource = new BehaviorSubject<Array<any>>([]);
  public bloodGroups = this.bloodGroupsSource.asObservable();

  getBloodGroups(): Observable<any> {
    return this.httpServive.get('open/getbloodgroups');
  }

  changeBloodGroups(bloodGroups: Array<any>) {
    this.bloodGroupsSource.next(bloodGroups);
    localStorage.setItem('blood-groups', JSON.stringify(bloodGroups));
  }

  getDiseases(): Observable<any> {
    return this.httpServive.get('open/getdiseases');
  }
}