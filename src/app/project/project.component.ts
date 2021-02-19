import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../interfaces';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project: Project;

  constructor(public route: ActivatedRoute, public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.subscribeToRoute();
  }

  subscribeToRoute(): void {
    this.route.params.subscribe(() => {
      // extract uid from route
      const uid = this.route.snapshot.paramMap.get('projectId');
      // get the project document
      this.firestore
        .collection<Project>('projects')
        .doc(uid)
        .valueChanges()
        .subscribe((res: Project) => {
          this.project = res;
        });
    });
  }

}
