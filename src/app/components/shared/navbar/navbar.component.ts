import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed: Boolean = true;

  constructor(public authService: AuthService) { }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
  }

}
