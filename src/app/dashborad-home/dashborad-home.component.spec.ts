import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboradHomeComponent } from './dashborad-home.component';

describe('DashboradHomeComponent', () => {
  let component: DashboradHomeComponent;
  let fixture: ComponentFixture<DashboradHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboradHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboradHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
