import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeBarComponent } from './home-bar.component';

describe('HomeBarComponent', () => {
  let component: HomeBarComponent;
  let fixture: ComponentFixture<HomeBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
