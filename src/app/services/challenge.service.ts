import { Challenge } from './../models/challenge.model';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class ChallengeService {

  constructor(private afs: AngularFirestore, private authSevice: AuthService) { }

  addChallenge(challengeData: Challenge) {
    return this.afs.collection('userChallenges').doc(this.authSevice.authState.uid).collection('challenges').add(challengeData);
  }

  updateChallenge(userId: string, challengeId: string, newData: any) {
    return this.afs.doc('userChallenges/' + userId + '/challenges/' + challengeId).update(newData);
  }

  deleteChallenge(userId: string, challengeId: string) {
    return this.afs.doc('userChallenges/' + userId + '/challenges/' + challengeId).delete();
  }

}
