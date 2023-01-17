
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { FirestoreService } from '../services/firestore.service';
import { InteractionService } from '../services/interaction.service';
import { EquipoI } from './models/models';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;

  equipos: EquipoI[] = [];
  newEquipo: EquipoI;

  newFile: any;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private firestore: FirestoreService,
    private interaction: InteractionService,
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  ngOnInit() {
    this.loadEquipos();

  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }


  signOut() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }




  addNew() {
    this.newEquipo = {
      nombre: '',
      apellido: '',
      edad: null,
      id: this.firestore.getId()

    }
  }

  loadEquipos() {
    const path = 'usuarios'
    this.firestore.getCollection<EquipoI>(path).subscribe(res => {
      if (res) {
        this.equipos = res;
      }

    })
  }

  editar(equipo: EquipoI) {
    console.log('editar', equipo);
    this.newEquipo = equipo;
  }


  async eliminar(equipo: EquipoI) {

    const res = await this.interaction.presentAlert('alert', 'seguro deseas eliminar?')
    console.log('res', res);
    if (res) {
      const path = 'usuarios'

      await this.firestore.deleteDoc(path, equipo.id);
      this.interaction.presentToast('Eliminadom con exito');

    }

  }

  async guardar() {
    await this.interaction.showLoading('Guardando...');
    console.log('datos', this.newEquipo);
    const path = 'usuarios';
    this.firestore.createDoc(this.newEquipo, path, this.newEquipo.id);
    this.interaction.presentToast('Guardado con exito');
    this.interaction.closeLoading();
  }



}
