import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { interval, map, Observable } from 'rxjs';
import { Dictionary } from '../dictionary';

interface TimetableEvent {
    id: number;
    day: string[];
    start: string;
    end: string;
    location?: string;
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
  colours = [
    '#BFFFC7',
    '#FFBFBF',
    '#BFC8FF',
    '#E2BFFF',
    '#FFBFED',
    '#BFFFFB',
    '#C7C7C7'
  ];
  type_dict: Dictionary<string> = {
    "travel": '#FFE9BF',
    "extracurricular": '#FCF5BD',
    "food": '#79B1B1'
  };
  title_dict: Dictionary<string> = {};
  colour_swapper = 0;
  px_time$ = interval(1000).pipe(map(() => this.timeToPx(`${(new Date()).getHours()}:${((new Date())).getMinutes()}`)));

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.timetable_events$ = this.http.get<TimetableEvent[]>("/timetable.json");
    for (let i=this.start_hour; i<24; i++) {
      this.hours.push(`${i}:00`);
    }
    const currentDate = new Date();
    let currentDay = currentDate.getDay();
    if (currentDay > 5) {
      currentDay = 1;
    }
    this.day = this.days_of_the_week[currentDay-1];
  }

  ngAfterViewInit(): void {
    let times = document.getElementById("times_proper") as HTMLDivElement;
    if (times){
      for (let div_elem of times.children) {
        (div_elem as HTMLDivElement).style["height"] = `${this.minute_in_px*60}px`;
      }
    }
  }

  timeToPx(time: string): number {
    let timeparts = time.split(":").map((x) => parseInt(x));
    return ((timeparts[0]-this.start_hour)*60 + timeparts[1]) * this.minute_in_px;
  }

  get_color(event: TimetableEvent): string {
    if (this.type_dict[event.type.toLowerCase()] != undefined) {
      return this.type_dict[event.type.toLowerCase()];
    }
    if (this.title_dict[event.title.toLowerCase()] == undefined) {
      this.title_dict[event.title.toLowerCase()] = this.colours[this.colour_swapper];
      this.colour_swapper++;
    }
    return this.title_dict[event.title.toLowerCase()];
  }
  
  day_in_daylist(event: TimetableEvent, current_day: string): boolean {
    for (let event_day in event.day) {
      if (event.day[event_day].toLowerCase() == current_day.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  onTDScroll(td : HTMLDivElement) {
    const scrolledTo = td.scrollTop + td.clientHeight;
    const isReachBottom = td.scrollHeight === scrolledTo;
    if (isReachBottom) {
      td.style.borderBottomWidth = "0";
    }
    else {
      td.style.borderBottomWidth = "1em";
    }
  }
}
