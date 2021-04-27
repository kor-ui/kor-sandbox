import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.scss']
})
export class NewProjectModalComponent implements OnInit {
  visible: boolean | undefined;
  projectData: Project | undefined = {
    name: undefined,
    owner: this.userService.user?.uid,
    editors: [this.userService.user?.uid],
    thumbnail: undefined,
    updatedDate: new Date(),
    createdDate: new Date(),
    uid: undefined,
    viewport: {
      width: 375,
      height: 667
    }
  };
  @Output() close = new EventEmitter();

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    // start animation
    setTimeout(() => {
      this.visible = true;
    }, 0);
  }

  closeModal(): void {
    this.visible = false;
    // wait for animation and remove component
    setTimeout(() => {
      this.close.emit(this.projectData);
    }, 100);
  }
}
