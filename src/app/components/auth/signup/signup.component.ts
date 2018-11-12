import { UserService } from './../../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService,
    private userService: UserService
  ) { }

  userModel: User = { name: '', email: '', password: '' };

  onSignUp(): void {
    this.authService.signUpWithEmail(this.userModel.email, this.userModel.password)
      .then(() => {
        return this.userService.addUser({ id: this.authService.authState.user.uid, name: this.userModel.name, email: this.userModel.email });
      }).then(() => {
        this._flashMessagesService.show('You are sigend up!', { cssClass: 'alert-success', timeout: 2000 });
        this.router.navigate(['/challenges']);
      }).catch(err => {
        const errMessage = err.toString().split(': ')[1];
        this._flashMessagesService.show(errMessage, { cssClass: 'alert-danger', timeout: 2000 });
      });
  }

  ngOnInit() {

  }

}
