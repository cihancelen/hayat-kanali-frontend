import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class EmployeeService {

    constructor(
        private httpService: HttpService
    ) { }

    employeeInfo(employee: any) {
        return this.httpService.post('employee/employeeInfo',employee);
    }

}