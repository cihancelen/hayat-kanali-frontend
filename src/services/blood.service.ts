import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class BloodService {

    constructor(
        private httpService: HttpService,
        private database: AngularFireDatabase
    ) { }

    getPatients(): Observable<any> {
        return this.httpService.get('patient/getPatients');
    }

    addBloodRequest(data: any) {
        return this.database.list('blood-requests/').push(data);
    }
}