import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTimetableJson } from './load-timetable-json';

describe('LoadTimetableJson', () => {
  let component: LoadTimetableJson;
  let fixture: ComponentFixture<LoadTimetableJson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadTimetableJson],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadTimetableJson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
