import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditBirthdayComponent } from './add-edit-birthday.component';

describe('AddBirthdayComponent', () => {
  let component: AddEditBirthdayComponent;
  let fixture: ComponentFixture<AddEditBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBirthdayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddEditBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
