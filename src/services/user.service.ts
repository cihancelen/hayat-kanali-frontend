import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpService } from './http.service';

@Injectable()
export class UserService {

  constructor(
    private httpService: HttpService
  ) { }

  getUserInfo(user_id: number) {
    return this.httpService.post('user/getuserinfo/', user_id);
  }

}