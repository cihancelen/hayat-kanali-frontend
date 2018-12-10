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

    

    addBloodRequest(data: any) {
        let x_data = {
            patientId : data.patient.id,
            bloodGroupId : data.patient.bloodGroupId,
            description: data.description,
            unitQuantity: parseInt(data.unitQuantity)
        };
        
        this.httpService.post('blood/addBloodRequest', x_data);
        return this.database.list('blood-requests/');
    }
}