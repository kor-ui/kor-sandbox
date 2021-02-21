import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './project/menu/menu.component';
import { CanvasComponent } from './project/canvas/canvas.component';
import { ConfigurationComponent } from './project/configuration/configuration.component';
import { CodeComponent } from './project/code/code.component';
import { ProjectComponent } from './project/project.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ProjectsComponent } from './projects/projects.component';
import { NewProjectModalComponent } from './projects/new-project-modal/new-project-modal.component';
import { UserDrawerComponent } from './user-drawer/user-drawer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CanvasComponent,
    ConfigurationComponent,
    CodeComponent,
    ProjectComponent,
    SignInComponent,
    ProjectsComponent,
    NewProjectModalComponent,
    UserDrawerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
