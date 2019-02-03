import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../home/home";
import { OpenDataService } from "../../services/open.data.service";
import { HttpService } from "../../services/http.service";
import { DefaultUserDashboardPage } from "../default-user-dashboard/default-user-dashboard";
import { UserService } from "../../services/user.service";
import { HospitalService } from "../../services/hospital.service";
import { EmployeeService } from "../../services/employee.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { patterns } from "../../classes/regex-pattern";
import { districtAndCities } from "../../classes/district-and-cities";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private openDataService: OpenDataService,
    private httpService: HttpService,
    private userService: UserService,
    private hospitalService: HospitalService,
    private employeeService: EmployeeService,
    public formBuilder: FormBuilder
  ) {

    if (localStorage.getItem('user-data'))
      this.navCtrl.setRoot(DefaultUserDashboardPage);
  }

  segment: string = 'login';
  citiesAndDistricts: Array<any> = districtAndCities.districtAndCities;
  districtByCity: Array<any> = [];

  bloodGroups: any = [];
  diseases: any = [];

  user: any = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    identificationNo: '',
    birthday: '',
    cityId: 0,
    district: '',
    bloodGroupId: 0,
    diseases: [],
    usingSmokingAndAlcohol: false,
    lastBloodDonation: ''
  };

  loginType: string = 'default-user';
  login_model: any = {
    email: '',
    password: ''
  };

  loginForm: FormGroup;
  isLoginSubmit: boolean = false;


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [this.login_model.email, [Validators.required, Validators.email, Validators.pattern(patterns.emailPattern)]],
      'password': [this.login_model.password, [Validators.required, Validators.minLength(3)]],
      'loginType': []
    });

    this.openDataService.getBloodGroups().subscribe(data => this.bloodGroups = data);
    this.openDataService.getDiseases().subscribe(data => this.diseases = data);
  }

  findDistrict(city): any {
    this.districtByCity = this.citiesAndDistricts.find(x => x.plaka == city);
  }

  register() {
    delete this.user['repassword'];

    this.httpService.register(this.user).subscribe(data => {
      this.httpService.login(data.email, this.user.password, "default-user").subscribe(user => {
        localStorage.setItem('user-data', JSON.stringify(user));
        localStorage.setItem('token', 'Bearer ' + user.access_token);

        this.navCtrl.setRoot(DefaultUserDashboardPage);
      })
    });
  }

  login() {
    this.isLoginSubmit = true;

    if (this.loginForm.valid) {
      this.httpService.login(this.login_model.email, this.login_model.password, this.loginType).subscribe(data => {
        this.httpService.changeHeader(data.access_token);

        if (this.loginType == 'default-user') {
          this.userService.getUserInfo({ email: this.login_model.email }).subscribe(x => {
            localStorage.setItem('user-info', JSON.stringify(x));


            this.navCtrl.setRoot(DefaultUserDashboardPage);
          });
        }
        else if (this.loginType == 'hospital') {
          this.hospitalService.getHospitalInfo({ email: this.login_model.email }).subscribe(x => {
            localStorage.setItem('hospital-info', JSON.stringify(x));

            this.hospitalService.getPatientsByHospital(x.id).subscribe(patients => {
              localStorage.setItem('patients', JSON.stringify(patients));
            });

            this.navCtrl.setRoot(HomePage);
          });
        }
        else if (this.loginType == 'employee') {
          this.employeeService.employeeInfo({ email: this.login_model.email }).subscribe(x => {
            localStorage.setItem('employee-info', JSON.stringify(x));
            this.navCtrl.setRoot(HomePage);
          });
        }
      });
    }
  }

  get lf() { return this.loginForm.controls }

}