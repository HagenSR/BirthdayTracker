import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBirthdayComponent } from './add-birthday.component';

describe('AddBirthdayComponent', () => {
  let component: AddBirthdayComponent;
  let fixture: ComponentFixture<AddBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBirthdayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
