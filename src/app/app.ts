import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from "./sidebar/sidebar";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-website');
  constructor(private router: Router) {
    this.router.events.subscribe(e => console.info(e));
  }
}
