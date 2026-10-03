import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Fernet } from '../fernet';
import { Router } from '@angular/router';

declare const google: any;

interface EncObject {
    salt: string;
    iterations: number;
    key_algorithm: string;
    ciphertext: string;
    ciphertext_algorithm: string;
}

@Component({
  selector: 'app-load-timetable-json',
  imports: [],
  templateUrl: './load-timetable-json.html',
  styleUrl: './load-timetable-json.scss',
})
export class LoadTimetableJson implements OnInit {

  timetable_ciphertext: Observable<EncObject> | null = null;
  @Output() timetable_plaintext = new EventEmitter<string>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.timetable_ciphertext = this.http.get<EncObject>("./timetable_enc.json");
  }

  decryptTimetable(): void {
    if (this.timetable_ciphertext) {
      this.timetable_ciphertext.subscribe((data) => {
        const pwd_elem = document.getElementById("password") as HTMLInputElement;
        this.deriveKey(data, pwd_elem.value).then(h => {
          let fernet = new Fernet();
          fernet.setUInt8Key(h);
          try {
            fernet.decrypt(data.ciphertext).then(plaintext => {
              let uint8_plaintext = new Uint8Array(plaintext);
              let text_decoder = new TextDecoder();
              let decoded_plaintext = text_decoder.decode(uint8_plaintext);
              console.info(decoded_plaintext);
              this.timetable_plaintext.emit(decoded_plaintext);
            }).catch(err => {
              alert("Decryption failed. Check your password.");
            });
          } catch (err) {
            console.info(err);
            throw err;
          }
        });
      });
    }
  }

  async deriveKey(params: EncObject, password: string): Promise<ArrayBuffer> {
    try {
      // https://stackoverflow.com/questions/40459020/angular-js-cryptography-pbkdf2-and-iteration/40468218#40468218
      let text_encoder = new TextEncoder();
      let base_key = await window.crypto.subtle.importKey("raw", text_encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
      let salt_buffer: ArrayBuffer = new Uint8Array(params.salt.match(/../g)!.map(h=>parseInt(h, 16))).buffer;
      let bits_key = await window.crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: new Uint8Array(salt_buffer),
          iterations: Number(params.iterations),
          hash: "SHA-256"
        },
        base_key, 256
      );
      return bits_key;
    }
    catch (err) {
      throw err;
    }
  }

  // initGoogleSignIn(): void {
  //   const client = google.accounts.oauth2.initTokenClient({
  //     client_id: this.clientId,
  //     scope: 'https://www.googleapis.com/auth/drive.readonly',
  //     redirect_uri: `${document.location.href}/timetable`,
  //     ux_mode: 'redirect'
  //   });

  //   client.requestAccessToken();

  //   // google.accounts.id.renderButton(
  //   //   document.getElementById('google-signin-button'),
  //   //   { theme: 'outline', size: 'large' }
  //   // );

  //   // google.accounts.id.prompt();
  // }

  // handleCredentialResponse(response: any) {
  //   alert("Callback")
  //   const token = response.credential;
  //   const decoded: any = jwtDecode(token);
  //   alert(decoded);
  // }
}
