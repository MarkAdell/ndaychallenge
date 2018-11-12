import { AuthService } from './../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ChallengeService } from './../../../services/challenge.service';
import { Challenge } from './../../../models/challenge.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from '../../../services/user.service';
import swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss']
})
export class ChallengeListComponent implements OnInit {

  modalRef: BsModalRef;
  newChallengeButtonActive: boolean = true;
  challenges: Challenge[];
  challengeModel: Challenge = { description: '', period: 90, elapsedPeriod: 0, lastDayFinished: '' };

  constructor(
    private modalService: BsModalService,
    private challengeService: ChallengeService,
    private _flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onNewChallenge(): void {
    this.newChallengeButtonActive = false;
    this.challengeService.addChallenge(this.challengeModel).then(() => {
      this.newChallengeButtonActive = true;
      this.modalRef.hide();
      this.challengeModel = { description: '', period: 90, elapsedPeriod: 0, lastDayFinished: '' };
      this._flashMessagesService.show('Created challenge successfully!', { cssClass: 'alert-success', timeout: 2000 });
    });
  }

  onDeleteChallenge(challengeId: string): void {
    swal({
      title: 'Are you sure?',
      text: "The challenge will be permanently deleted!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete'
    }).then((result) => {
      if (result.value) {
        this.challengeService.deleteChallenge(this.authService.authState.uid, challengeId);
      }
    });
  }

  ngOnInit() {
    this.userService.getUserChallenges(this.authService.authState.uid).snapshotChanges()
    .pipe(map(challenges => {
      return challenges.map(a => {
        const data = a.payload.doc.data() as Challenge;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })).subscribe(challenges => {
      this.challenges = challenges;
    });
  }

}
