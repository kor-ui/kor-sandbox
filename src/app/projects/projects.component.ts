import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Page, Project } from '../interfaces';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  newProjectModalVisible: boolean | undefined;
  projects: Project[] | undefined;

  constructor(
    public firestore: AngularFirestore,
    public userService: UserService,
    public projectService: ProjectService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects()
      .subscribe((res: Project[]) => {
        this.projects = res;
      });;
  }
}
