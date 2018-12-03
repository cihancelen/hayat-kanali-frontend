import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class HospitalService {

    constructor(
        private httpService: HttpService
    ) { }

    getHospitalInfo(hospital){
        return this.httpService.post('hospital/hospitalInfo', hospital);
    }
}