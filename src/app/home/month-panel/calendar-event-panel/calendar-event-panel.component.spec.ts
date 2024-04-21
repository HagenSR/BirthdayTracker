import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarEventPanelComponent } from './calendar-event-panel.component';

describe('CalendarEventPanelComponent', () => {
  let component: CalendarEventPanelComponent;
  let fixture: ComponentFixture<CalendarEventPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEventPanelComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarEventPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
