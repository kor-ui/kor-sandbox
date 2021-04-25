import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  visible: boolean | undefined;
  @Output() close = new EventEmitter();

  constructor(public userService: UserService, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    // start animation
    setTimeout(() => {
      this.visible = true;
    }, 0);
  }

  closeModal(): void {
    this.visible = false;
    // wait for animation and remove component
    setTimeout(() => (this.close.emit()), 100);
  }

  // triggers firebase auth
  signIn(provider: string): void {
    const providers: { [key: string]: any; } = {
      google: new firebase.auth.GoogleAuthProvider(),
      facebook: new firebase.auth.FacebookAuthProvider()
    };
    this.auth.signInWithPopup(providers[provider]).then(() => {
      this.closeModal();
    });
  }
}
