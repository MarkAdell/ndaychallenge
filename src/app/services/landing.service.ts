import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class LandingService {

  constructor(private afs: AngularFirestore) { }

  getLandingData() {
    return this.afs.collection<any>('landing');
  }
}
