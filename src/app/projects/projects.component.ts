import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Project } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  newProjectModalVisible: boolean;
  projects: any;

  constructor(public firestore: AngularFirestore, public userService: UserService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projects = this.firestore
      .collection('projects')
      .valueChanges()
      .subscribe((res: Project[]) => {
        this.projects = res;
        console.log('projects', res);
      });
  }

  setProjectData(project: Project) {
    this.firestore
      .collection('projects')
      .doc()
      .set(project);
  }

}
