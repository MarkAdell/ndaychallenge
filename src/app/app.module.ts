import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CollapseModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ChallengeListComponent } from './components/challenge/challenge-list/challenge-list.component';
import { ChallengeComponent } from './components/challenge/challenge/challenge.component';
import { LandingComponent } from './components/landing/landing.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ChallengeService } from './services/challenge.service';
import { LandingService } from './services/landing.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notauth.guard';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    ChallengeListComponent,
    ChallengeComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CollapseModule.forRoot(),
    FormsModule,
    FlashMessagesModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, UserService, ChallengeService, LandingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
