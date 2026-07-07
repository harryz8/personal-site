import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  path: string = "";

  constructor(private router : Router) {}

  ngOnInit(): void {
    this.path = this.router.url;
    this.router.events.subscribe(() => {
      this.path = this.router.url;
    });
  }
}
