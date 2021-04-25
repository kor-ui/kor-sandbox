import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  signInModalVisible: boolean | undefined;
  userDrawerVisible: boolean | undefined;
  user: User | undefined;

  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore) {
    // listen to auth state change and update user
    this.auth.onAuthStateChanged((authUser: firebase.User | null) => {
      if (authUser) {
        this.getUser(authUser?.uid)
          .then((res: DocumentSnapshot<User>) => {
            // if user exists, subscribe to it, if not, set a new user
            if (res.exists) {
              this.subscribeToUser(res.data());
            } else {
              this.setUser(authUser);
            }
          });
      }
    });
  }

  // search user database for authUser uid
  getUser(userId: string): Promise<any> {
    return this.firestore
      .collection<User>('users')
      .doc(userId)
      .get()
      .toPromise();
  }

  // set a new user
  setUser(authUser: firebase.User) {
    if (authUser) {
      const userData: User = {
        name: authUser.displayName!,
        image: authUser.photoURL!,
        email: authUser.email!,
        uid: authUser.uid!
      };
      this.firestore
        .collection<User>('users')
        .doc(authUser.uid)
        .set(userData).then(() => {
          this.subscribeToUser(userData);
        });
    } else {
      this.user = undefined;
    }
  }

  // subscribe to user document
  subscribeToUser(user: User): void {
    this.firestore
      .collection<User>('users')
      .doc(user.uid)
      .valueChanges()
      .subscribe((res: User | undefined) => {
        this.user = res;
      });
  }

  // sign user out
  signOut(): void {
    this.auth.signOut();
  }
}
