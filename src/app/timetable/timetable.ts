import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

interface TimetableEvent {
    id: number;
    day: string;
    start: string;
    end: string;
    location: string;
    type: string;
    title: string;
}

@Component({
  selector: 'app-timetable',
  imports: [ AsyncPipe ],
  templateUrl: './timetable.html',
  styleUrl: './timetable.scss',
})
export class Timetable implements AfterViewInit, OnInit {
  days_of_the_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  day = "Monday";
  start_hour = 6;
  hours: string[] = [];
  minute_in_px = 1.25;
  timetable_events$: Observable<TimetableEvent[]> | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.timetable_events$ = this.http.get<TimetableEvent[]>("/timetable.json");
    for (let i=this.start_hour; i<24; i++) {
      this.hours.push(`${i}:00`);
    }
  }

  ngAfterViewInit(): void {
    let times = document.getElementById("times") as HTMLDivElement
    if (times){
      for (let div_elem of times.children) {
        (div_elem as HTMLDivElement).style["height"] = `${this.minute_in_px*60}px`;
      }
    }
  }

  timeToPx(time: string): number {
    let timeparts = time.split(":").map((x) => parseInt(x));
    return (timeparts[0]*60 + timeparts[1]) * this.minute_in_px;
  }
}
