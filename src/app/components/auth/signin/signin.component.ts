import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private _flashMessagesService: FlashMessagesService) { }

  userModel: User = { email: '', password: '' };

  onSignIn(): void {
    this.authService.loginWithEmail(this.userModel.email, this.userModel.password)
      .then(() => {
        this._flashMessagesService.show('You are sigend in!', { cssClass: 'alert-success', timeout: 2000 });
        this.router.navigate(['/my-challenges']);
      }).catch(err => {
        const errMessage = err.toString().split(': ')[1];
        this._flashMessagesService.show(errMessage, { cssClass: 'alert-danger', timeout: 2000 });
      });
  }

  ngOnInit() {
  }

}
