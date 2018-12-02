import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class NotificationService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  notification(message: string, position: string = 'top', duration: number = 3000): void {
    this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      closeButtonText: 'X'
    });
  };
}