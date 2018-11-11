import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'request-item',
  templateUrl: 'request-item.html'
})
export class RequestItemComponent implements OnInit {

  patients: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.patients = [
      {
        id: 0, name: 'Murat', surname: 'Seçkin', phone: '545 666 1144', mail: 'seckinmurat@mail.net', patient: 'Böbrek nakli', relativesOfPatient: {
          name: 'Ahmet', surname: 'Basan', phone: '555 444 2132', mail: 'ahmet.basan@gmail.com'
        },
        bloodGroup: 'Arh +', emergency: true
      }, 
      {
        id: 1, name: 'Mehmet', surname: 'Demirci', phone: '542 556 3324', mail: 'mehmet-demirci@gmail.com', patient: 'Bypass Ameliyatı', relativesOfPatient: {
          name: 'Merve', surname: 'Demirci', phone: '535 665 4451', mail: 'demirci.merve@hotmail.com'
        },
        bloodGroup: '0rh +', emergency: false
      },
      {
        id: 2, name: 'Sude', surname: 'Kaya', phone: '532 445 2326', mail: 'sudee221@yahoo.com', patient: 'Kalp Kapakçığı Değişim', relativesOfPatient: {
          name: 'Mert', surname: 'Şeker', phone: '553 444 3322', mail: 'mertseker@gmail.com'
        },
        bloodGroup: 'Arh -', emergency:true
      },
      {
        id: 0, name: 'Murat', surname: 'Seçkin', phone: '545 666 1144', mail: 'seckinmurat@mail.net', patient: 'Böbrek nakli', relativesOfPatient: {
          name: 'Ahmet', surname: 'Basan', phone: '555 444 2132', mail: 'ahmet.basan@gmail.com'
        },
        bloodGroup: 'Arh +', emergency: true
      }, 
      {
        id: 1, name: 'Mehmet', surname: 'Demirci', phone: '542 556 3324', mail: 'mehmet-demirci@gmail.com', patient: 'Bypass Ameliyatı', relativesOfPatient: {
          name: 'Merve', surname: 'Demirci', phone: '535 665 4451', mail: 'demirci.merve@hotmail.com'
        },
        bloodGroup: '0rh +', emergency: false
      },
      {
        id: 2, name: 'Sude', surname: 'Kaya', phone: '532 445 2326', mail: 'sudee221@yahoo.com', patient: 'Kalp Kapakçığı Değişim', relativesOfPatient: {
          name: 'Mert', surname: 'Şeker', phone: '553 444 3322', mail: 'mertseker@gmail.com'
        },
        bloodGroup: 'Arh -', emergency:true
      },
      {
        id: 0, name: 'Murat', surname: 'Seçkin', phone: '545 666 1144', mail: 'seckinmurat@mail.net', patient: 'Böbrek nakli', relativesOfPatient: {
          name: 'Ahmet', surname: 'Basan', phone: '555 444 2132', mail: 'ahmet.basan@gmail.com'
        },
        bloodGroup: 'Arh +', emergency: true
      }, 
      {
        id: 1, name: 'Mehmet', surname: 'Demirci', phone: '542 556 3324', mail: 'mehmet-demirci@gmail.com', patient: 'Bypass Ameliyatı', relativesOfPatient: {
          name: 'Merve', surname: 'Demirci', phone: '535 665 4451', mail: 'demirci.merve@hotmail.com'
        },
        bloodGroup: '0rh +', emergency: false
      },
      {
        id: 2, name: 'Sude', surname: 'Kaya', phone: '532 445 2326', mail: 'sudee221@yahoo.com', patient: 'Kalp Kapakçığı Değişim', relativesOfPatient: {
          name: 'Mert', surname: 'Şeker', phone: '553 444 3322', mail: 'mertseker@gmail.com'
        },
        bloodGroup: 'Arh -', emergency:true
      },
      {
        id: 0, name: 'Murat', surname: 'Seçkin', phone: '545 666 1144', mail: 'seckinmurat@mail.net', patient: 'Böbrek nakli', relativesOfPatient: {
          name: 'Ahmet', surname: 'Basan', phone: '555 444 2132', mail: 'ahmet.basan@gmail.com'
        },
        bloodGroup: 'Arh +', emergency: true
      }, 
      {
        id: 1, name: 'Mehmet', surname: 'Demirci', phone: '542 556 3324', mail: 'mehmet-demirci@gmail.com', patient: 'Bypass Ameliyatı', relativesOfPatient: {
          name: 'Merve', surname: 'Demirci', phone: '535 665 4451', mail: 'demirci.merve@hotmail.com'
        },
        bloodGroup: '0rh +', emergency: false
      },
      {
        id: 2, name: 'Sude', surname: 'Kaya', phone: '532 445 2326', mail: 'sudee221@yahoo.com', patient: 'Kalp Kapakçığı Değişim', relativesOfPatient: {
          name: 'Mert', surname: 'Şeker', phone: '553 444 3322', mail: 'mertseker@gmail.com'
        },
        bloodGroup: 'Arh -', emergency:true
      },
      {
        id: 0, name: 'Murat', surname: 'Seçkin', phone: '545 666 1144', mail: 'seckinmurat@mail.net', patient: 'Böbrek nakli', relativesOfPatient: {
          name: 'Ahmet', surname: 'Basan', phone: '555 444 2132', mail: 'ahmet.basan@gmail.com'
        },
        bloodGroup: 'Arh +', emergency: true
      }, 
      {
        id: 1, name: 'Mehmet', surname: 'Demirci', phone: '542 556 3324', mail: 'mehmet-demirci@gmail.com', patient: 'Bypass Ameliyatı', relativesOfPatient: {
          name: 'Merve', surname: 'Demirci', phone: '535 665 4451', mail: 'demirci.merve@hotmail.com'
        },
        bloodGroup: '0rh +', emergency: false
      },
      {
        id: 2, name: 'Sude', surname: 'Kaya', phone: '532 445 2326', mail: 'sudee221@yahoo.com', patient: 'Kalp Kapakçığı Değişim', relativesOfPatient: {
          name: 'Mert', surname: 'Şeker', phone: '553 444 3322', mail: 'mertseker@gmail.com'
        },
        bloodGroup: 'Arh -', emergency:true
      },
      {
        id: 0, name: 'Murat', surname: 'Seçkin', phone: '545 666 1144', mail: 'seckinmurat@mail.net', patient: 'Böbrek nakli', relativesOfPatient: {
          name: 'Ahmet', surname: 'Basan', phone: '555 444 2132', mail: 'ahmet.basan@gmail.com'
        },
        bloodGroup: 'Arh +', emergency: true
      }, 
      {
        id: 1, name: 'Mehmet', surname: 'Demirci', phone: '542 556 3324', mail: 'mehmet-demirci@gmail.com', patient: 'Bypass Ameliyatı', relativesOfPatient: {
          name: 'Merve', surname: 'Demirci', phone: '535 665 4451', mail: 'demirci.merve@hotmail.com'
        },
        bloodGroup: '0rh +', emergency: false
      },
      {
        id: 2, name: 'Sude', surname: 'Kaya', phone: '532 445 2326', mail: 'sudee221@yahoo.com', patient: 'Kalp Kapakçığı Değişim', relativesOfPatient: {
          name: 'Mert', surname: 'Şeker', phone: '553 444 3322', mail: 'mertseker@gmail.com'
        },
        bloodGroup: 'Arh -', emergency:true
      },
      {
        id: 0, name: 'Murat', surname: 'Seçkin', phone: '545 666 1144', mail: 'seckinmurat@mail.net', patient: 'Böbrek nakli', relativesOfPatient: {
          name: 'Ahmet', surname: 'Basan', phone: '555 444 2132', mail: 'ahmet.basan@gmail.com'
        },
        bloodGroup: 'Arh +', emergency: true
      }, 
      {
        id: 1, name: 'Mehmet', surname: 'Demirci', phone: '542 556 3324', mail: 'mehmet-demirci@gmail.com', patient: 'Bypass Ameliyatı', relativesOfPatient: {
          name: 'Merve', surname: 'Demirci', phone: '535 665 4451', mail: 'demirci.merve@hotmail.com'
        },
        bloodGroup: '0rh +', emergency: false
      },
      {
        id: 2, name: 'Sude', surname: 'Kaya', phone: '532 445 2326', mail: 'sudee221@yahoo.com', patient: 'Kalp Kapakçığı Değişim', relativesOfPatient: {
          name: 'Mert', surname: 'Şeker', phone: '553 444 3322', mail: 'mertseker@gmail.com'
        },
        bloodGroup: 'Arh -', emergency:true
      },
    ];

  }

}
