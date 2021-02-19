import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  newProjectModalVisible: boolean;

  constructor(public firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  setProjectData(project: Project) {
    console.log(project)
    this.firestore.collection('projects').doc().set(project).then(res => {
      console.log(res)
    })
  }

}
