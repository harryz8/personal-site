import { Component, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSquareEnvelope, faSquarePhone, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';

@Component({
  selector: 'app-home',
  imports: [ FontAwesomeModule, NgbCollapse ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  falinkedIn = faSquareLinkedin;
  faSquareEnvelope = faSquareEnvelope;
  faSquarePhone = faSquarePhone;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;
  isLinkedinCollapsed = true;
  isEmailCollapsed = true;
  isPhoneCollapsed = true;

  @ViewChild('linkedin_info') linkedin_info : NgbCollapse = {} as NgbCollapse;
  @ViewChild('email_info') email_info : NgbCollapse = {} as NgbCollapse;
  @ViewChild('phone_info') phone_info : NgbCollapse = {} as NgbCollapse;

  constructor(ngbConfig: NgbConfig) {

  }

  onLinkedinShown() : void {
    setTimeout(() => this.linkedin_info.toggle(), 3000)
  }

  onEmailShown() : void {
    setTimeout(() => this.email_info.toggle(), 3000)
  }

  onPhoneShown() : void {
    setTimeout(() => this.phone_info.toggle(), 3000)
  }

  toggle_linkedin() : void {
    if (this.isLinkedinCollapsed) {
      this.linkedin_info.toggle();
    }
  }

  toggle_email() : void {
    if (this.isEmailCollapsed) {
      this.email_info.toggle();
    }
  }

  toggle_phone() : void {
    if (this.isPhoneCollapsed) {
      this.phone_info.toggle();
    }
  }
}
