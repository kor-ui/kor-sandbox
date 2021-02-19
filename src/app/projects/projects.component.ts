import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Project } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  newProjectModalVisible: boolean;
  projects: Project[];;

  constructor(
    public firestore: AngularFirestore,
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  // get all projects
  getProjects(): void {
    this.firestore
      .collection<Project>('projects')
      .valueChanges()
      .subscribe((res: Project[]) => {
        this.projects = res;
      });
  }

  // create new project
  setProject(project: Project) {
    project.uid = this.firestore.createId();
    this.firestore
      .collection<Project>('projects')
      .doc(project.uid)
      .set(project);
  }

}
