import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthPanelComponent } from './month-panel.component';

describe('MonthPanelComponent', () => {
  let component: MonthPanelComponent;
  let fixture: ComponentFixture<MonthPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthPanelComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MonthPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
