import { NotAuthGuard } from './guards/notauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { ChallengeComponent } from './components/challenge/challenge/challenge.component';
import { ChallengeListComponent } from './components/challenge/challenge-list/challenge-list.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'signup', component: SignupComponent, canActivate: [NotAuthGuard] },
    { path: 'signin', component: SigninComponent, canActivate: [NotAuthGuard] },
    { path: 'my-challenges', component: ChallengeListComponent, canActivate: [AuthGuard]},
    { path: 'my-challenges/:id', component: ChallengeComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
