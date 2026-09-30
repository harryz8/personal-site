import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import * as gws from '@googleworkspace/drive-picker-element';

declare const google: any;

@Component({
  selector: 'app-load-timetable-json',
  imports: [],
  templateUrl: './load-timetable-json.html',
  styleUrl: './load-timetable-json.scss',
})
export class LoadTimetableJson implements OnInit {

  clientId = "1068245758004-bsug006epkscqefqk1cqij002jbsvm4q.apps.googleusercontent.com"

  constructor() {}

  ngOnInit(): void {
    this.initGoogleSignIn();
  }

  initGoogleSignIn(): void {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: this.clientId,
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      redirect_uri: `${document.location.href}/timetable`,
      ux_mode: 'redirect'
    });

    client.requestAccessToken();

    // google.accounts.id.renderButton(
    //   document.getElementById('google-signin-button'),
    //   { theme: 'outline', size: 'large' }
    // );

    // google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    alert("Callback")
    const token = response.credential;
    const decoded: any = jwtDecode(token);
    alert(decoded);
  }
}
