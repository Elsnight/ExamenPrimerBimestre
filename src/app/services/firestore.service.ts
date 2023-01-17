import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { deleteDoc, doc } from '@firebase/firestore';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore, public storage: AngularFireStorage) { }

  //crear documentos 
  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  //generar id aleatorio
  getId() {
    return this.firestore.createId();
  }

  //leer  las colecciones
  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }


  updateDoc(path: string, id: string, data: any) {
    return this.firestore.collection(path).doc(id).update(data);

  }

  //eliminar documentos

  deleteDoc(path: string, id: string) {
    return this.firestore.collection(path).doc(id).delete();
  }




}
