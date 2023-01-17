import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  loading: any;

  constructor(public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private alertController: AlertController) { }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }

  async showLoading(mensaje: string) {
    this.loading = await this.loadingCtrl.create({
      message: mensaje,
      cssClass: 'my-custom-class',
    });

    await this.loading.present();
  }

  async presentAlert(texto: string, subtitulo: string) {
    let aceptar = false;

    const alert = await this.alertController.create({
      header: texto,
      subHeader: subtitulo,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        },
        {
          text: 'OK',

          handler: () => {
            aceptar = true;
          },
        },
      ],

    });

    await alert.present();
    await alert.onDidDismiss();
    return aceptar
  }

  async closeLoading() {

    await this.loading.dismiss();
  }
}
