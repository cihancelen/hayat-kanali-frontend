import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable()
export class HospitalService {

    constructor(
        private httpService: HttpService
    ) { }

    getHospitalInfo(hospital) {
        return this.httpService.post('hospital/hospitalInfo', hospital);
    }

    addClinic(clinic) {
        return this.httpService.post('clinic/addClinic', clinic);
    }

    addEmployee(employee) {
        return this.httpService.post('employee/addEmployee', employee);
    }

    getPatientsByHospital(hospitalId): Observable<any> {
        return this.httpService.get('patient/' + hospitalId);
    }

    getDoctorByHospital(hospitalId): Observable<any> {
        return this.httpService.get('hospital/' + hospitalId);
    }

    addPatient(patient): Observable<any> {
        return this.httpService.post('patient/addPatient', patient);
    }

    addRelative(relative): Observable<any> {
        return this.httpService.post('patient/addRelative', relative);
    }

    getRelativeByRelativeId(relativeId): Observable<any> {
        return this.httpService.get(`patient/getRelativeByRelativeId/${relativeId}`);
    }
}