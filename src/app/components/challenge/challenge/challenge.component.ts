import { ChallengeService } from './../../../services/challenge.service';
import { Challenge } from './../../../models/challenge.model';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  challengeId: string;
  userId: string;
  challenge: Challenge;
  challengeDays: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private challengeService: ChallengeService
  ) { }

  onDayFinish(clickedDayNumber) {
    const dayToFinish = this.challengeDays.find(day => day.isDayFinished === false);
    if (dayToFinish && clickedDayNumber > dayToFinish.dayNumber && this.isMyBoard) {
      swal({ type: 'error', text: `You must finish day number ${dayToFinish.dayNumber} first` });
      return;
    } else if (!dayToFinish || dayToFinish && clickedDayNumber < dayToFinish.dayNumber || !this.isMyBoard) {
      return;
    }
    const todaysDate = moment().format('DD/MM/YYYY');
    if (todaysDate === this.challenge.lastDayFinished) {
      swal({ type: 'error', text: 'You are done today, stay strong until tomorrow!' });
      return;
    }
    this.challengeService.updateChallenge(
      this.authService.authState.uid,
      this.challengeId,
      { elapsedPeriod: this.challenge.elapsedPeriod + 1, lastDayFinished: todaysDate }
     ).then(() => {
       if (this.challenge.elapsedPeriod === this.challenge.period) {
         swal(
           'Well Done',
           `You have reached your goal!`,
           'success'
         );
       } else {
         swal(
           'Good Jooooooob!',
           `You are ${this.challenge.period - this.challenge.elapsedPeriod} days away from your goal!`,
           'success'
         );
       }
     });
  }

  onResetChallenge() {
    swal({
      title: 'Are you sure?',
      text: "Everything will be reset!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset'
    }).then((result) => {
      if (result.value) {
        this.challengeService.updateChallenge(
          this.userId,
          this.challengeId,
          { elapsedPeriod: 0, lastDayFinished: '' }
        );
      }
    });
  }

  buildChallengeDays() {
    this.challengeDays.length = 0;
    for (let i = 0; i < this.challenge.period; i++) {
      const challengeDay = {
        dayNumber: i + 1,
        isDayFinished: (i + 1 <= this.challenge.elapsedPeriod)
      };
      this.challengeDays.push(challengeDay);
    }
  }

  get isMyBoard(): boolean {
    return this.userId === this.authService.authState.uid;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.challengeId = params['challengeId'];
      this.userService.getUserChallenge(this.userId, this.challengeId).valueChanges()
        .subscribe(challenge => {
          this.challenge = challenge as Challenge;
          this.buildChallengeDays();
        });
    });
  }

}
