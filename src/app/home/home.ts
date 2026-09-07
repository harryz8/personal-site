import { Component, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import { faSquareEnvelope, faSquarePhone, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, NgbCollapse, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  falinkedIn = faSquareLinkedin;
  faSquareEnvelope = faSquareEnvelope;
  faSquarePhone = faSquarePhone;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;
  faGithub = faSquareGithub;
  hoverFlag = false;

  constructor(ngbConfig: NgbConfig) {

  }

  openCV() {
    window.location.href = "https://docs.google.com/document/d/1-N2ESBefLvTB9VmqQyilhvnWzbDZRBoygS62cZ4Mc3E/edit?usp=sharing";
  }
}
