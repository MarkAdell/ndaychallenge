import { AuthService } from './../../services/auth.service';
import { LandingService } from './../../services/landing.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  landingPageData = {
      sec1Text: '',
      sec2Text: '',
      sec3Text: '',
      sec4Text: ''
  };

  constructor(private landingService: LandingService, private router: Router, private authService: AuthService) { }

  onTryNow() {
    if (this.authService.authState) {
      this.router.navigate(['/challenges']);
    } else {
      this.router.navigate(['/signup']);
    }
  }

  ngOnInit() {
    this.landingService.getLandingData().valueChanges().subscribe(docs => {
      this.landingPageData.sec1Text = docs[0].text.sec1;
      this.landingPageData.sec2Text = docs[0].text.sec2;
      this.landingPageData.sec3Text = docs[0].text.sec3;
      this.landingPageData.sec4Text = docs[0].text.sec4;
    })
  }

}
