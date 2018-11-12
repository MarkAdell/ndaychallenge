import { Observable } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private _flashMessagesService: FlashMessagesService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(map(auth => {
      if (!auth) {
        this.router.navigate(['/signin']);
        this._flashMessagesService.show('You must be logged in to access this page!', { cssClass: 'alert-danger', timeout: 2000 });
        return false;
      } else {
        return true;
      }
    }));
  }
}

