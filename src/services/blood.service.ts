import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class BloodService {

    constructor(
        private httpService: HttpService,
        private database: AngularFireDatabase
    ) { }

    requests: Array<any> = [];

    addBloodRequest(data: any): any {
        let x_data = {
            patientId: data.patient.id,
            bloodGroupId: data.patient.bloodGroupId,
            description: data.description,
            unitQuantity: parseInt(data.unitQuantity),
            waitingUnit: 0,
            suppliedUnit: 0
        };

        this.httpService.post('blood/addBloodRequest', x_data).subscribe();
        const _value = this.database.list('blood-requests/');
        return _value;
    }
}