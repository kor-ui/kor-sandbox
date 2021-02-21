import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-drawer',
  templateUrl: './user-drawer.component.html',
  styleUrls: ['./user-drawer.component.scss']
})
export class UserDrawerComponent implements OnInit {
  visible: boolean;
  @Output() close = new EventEmitter();

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 0);
  }

  closeDrawer(): void {
    this.visible = false;
    setTimeout(() => {
      this.close.emit();
    }, 100);
  }

}
