import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpService } from './http.service';

@Injectable()
export class UserService {

  constructor(
    private httpService: HttpService
  ) { }

  getUserInfo(user: any) {
    return this.httpService.post('user/UserInfo/', user);
  }

}