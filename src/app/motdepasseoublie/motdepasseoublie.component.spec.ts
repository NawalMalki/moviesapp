import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotdepasseoublieComponent } from './motdepasseoublie.component';

describe('MotdepasseoublieComponent', () => {
  let component: MotdepasseoublieComponent;
  let fixture: ComponentFixture<MotdepasseoublieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MotdepasseoublieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotdepasseoublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
