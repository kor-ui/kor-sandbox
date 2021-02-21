import { Component, Input, OnInit } from '@angular/core';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { User } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  @Input() userId: string;
  user: User;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    // get user document on load
    this.userService.getUser(this.userId).then((res: DocumentSnapshot<User>) => {
      this.user = res.data();
    });
  }

}
