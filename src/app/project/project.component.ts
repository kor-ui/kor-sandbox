import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Page, Project } from '../interfaces';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project: Project;
  pages: Page[];
  currentPage: Page;

  constructor(
    public route: ActivatedRoute,
    public firestore: AngularFirestore,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeToRoute();
  }

  subscribeToRoute(): void {
    this.route.params.subscribe((params) => {
      // extract projectId from route, if projectId is new, get and assign project
      this.firestore
        .collection<Project>('projects')
        .doc(params.projectId)
        .valueChanges()
        .subscribe((res: Project) => {
          // assign project data
          this.project = res;
          this.getPages(this.project.uid).then(res => {
            // assign pages gotten from promise
            this.pages = res;
            if (this.pages?.length > 0) {
              if (params.pageId) {
                // if a pageId param exists, assign page to currentPage
                this.currentPage = this.pages?.find(({ uid }) => uid === params.pageId);
              } else {
                // else, assign first page of project to currentPage
                this.openPage(this.pages[0].uid);
              }
            }
          });
        });
    });
  }

  // get pages of project
  getPages(projectId: string): Promise<Page[]> {
    return new Promise(resolve => {
      this.firestore
        .collection<Project>('projects')
        .doc(projectId)
        .collection<Page>('pages')
        .valueChanges()
        .subscribe((res: Page[]) => {
          resolve(res);
        });
    });
  }

  // set the content of current page
  setCurrentPageContent(content: string): void {
    this.firestore
      .collection<Project>('projects')
      .doc(this.project?.uid)
      .collection<Page>('pages')
      .doc(this.currentPage?.uid)
      .update({ 'content': content });
  }

  // open a page given the id
  openPage(pageId: string): void {
    this.router.navigate([`project/${this.project?.uid}`, { pageId: pageId }]);
  }

}
