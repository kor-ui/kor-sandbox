import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: firebase.User;

  constructor(public auth: AngularFireAuth) {
    // listen to auth state change and update user
    this.auth.onAuthStateChanged((authUser: firebase.User) => {
      this.user = authUser;
      console.log(this.user)
    });
  }
}
