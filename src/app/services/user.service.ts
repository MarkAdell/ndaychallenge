import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor(private afs: AngularFirestore) { }

  addUser(userData: User) {
    return this.afs.collection('users').doc(userData.id).set(userData);
  }

  getUserChallenges(userId: string) {
    return this.afs.doc('userChallenges/' + userId).collection('challenges');
  }

  getUserChallenge(userId: string, challengeId: string) {
    return this.afs.doc('userChallenges/' + userId + '/challenges/' + challengeId);
  }

}
