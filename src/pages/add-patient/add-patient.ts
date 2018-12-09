import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OpenDataService } from '../../services/open.data.service';
import { HospitalService } from '../../services/hospital.service';
import { NotificationService } from '../../services/notification.service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-add-patient',
  templateUrl: 'add-patient.html',
})
export class AddPatientPage implements OnInit {

  constructor(
    private openDataService: OpenDataService,
    private hospitalService: HospitalService,
    private notificationService: NotificationService,
    private navCtrl: NavController
  ) { }

  bloodGroups:Array<any> = [];
  doctors:Array<any> = [];
  show: number = 1;
  hospitalId: number = JSON.parse(localStorage.getItem('hospital-info')).id;;
  
  patient: any = {
    identificationNo: '',
    name:'',
    surname:'',
    phone:'',
    email:'',
    gender:'',
    birthday:'',
    bloodGroupId:null,
    doctorId: null,
    hospitalId: this.hospitalId,
    relativeId : null,
    disease: ''
  };

  relative:any = {
    identificationNo: '',
    name:'',
    surname:'',
    phone:'',
    email:'',
    gender:'',
    birthday:''
  };
  

  ngOnInit() {
    this.openDataService.getBloodGroups().subscribe(data =>{
      this.bloodGroups = data;
    });

    this.hospitalService.getDoctorByHospital(this.hospitalId).subscribe(data =>{
      this.doctors = data;
    })
   }

   prev(){
     this.show = 1;
   }

   next(){
     this.show = 2;
   }

   save(){
    this.hospitalService.addRelative(this.relative).subscribe(data =>{
      this.patient.relativeId = data.id;
      
      this.hospitalService.addPatient(this.patient).subscribe(patient =>{
        
        this.hospitalService.getPatientsByHospital(this.hospitalId).subscribe(patients =>{
          localStorage.setItem('patients', JSON.stringify(patients));
        });
        
        this.notificationService.notification('Hasta başarıyla eklenmiştir.');

        this.navCtrl.setRoot(HomePage);
        
      })
    })
   }

}
