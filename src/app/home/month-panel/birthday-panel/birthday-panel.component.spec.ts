import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BirthdayPanelComponent } from './birthday-panel.component';

describe('BirthdayPanelComponent', () => {
  let component: BirthdayPanelComponent;
  let fixture: ComponentFixture<BirthdayPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthdayPanelComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BirthdayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
