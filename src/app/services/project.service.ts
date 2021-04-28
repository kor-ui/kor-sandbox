import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Page, Project } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    public firestore: AngularFirestore
  ) { }

  // get all projects
  getProjects(): Observable<Project[]> {
    return this.firestore
      .collection<Project>('projects', ref => ref.orderBy('updatedDate', 'desc'))
      .valueChanges();
  }

  // create new project
  setProject(project: Project): void {
    project.uid = this.firestore.createId();
    this.firestore
      .collection<Project>('projects')
      .doc(project.uid)
      .set(project)
      .then(() => this.createPage(project.uid!));
  }

  // create first empty page of new project
  createPage(projectId: string | undefined, pageName: string = 'Page 1'): Promise<string> {
    const newPage: Page = {
      uid: this.firestore.createId(),
      name: pageName,
      content: '<kor-page></kor-page>'
    };
    return new Promise(resolve => {
      this.firestore
        .collection<Project>('projects')
        .doc(projectId)
        .collection<Page>('pages')
        .doc(newPage.uid)
        .set(newPage).then(() => {
          resolve(newPage.uid);
        });
    });
  }
}
