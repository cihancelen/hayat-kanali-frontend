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

    addClinic(clinic){
        return this.httpService.post('clinic/addClinic', clinic);
    }

    addEmployee(employee){
        return this.httpService.post('employee/addEmployee', employee);
    }
}