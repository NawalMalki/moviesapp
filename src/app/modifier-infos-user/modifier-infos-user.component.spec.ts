import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierInfosUserComponent } from './modifier-infos-user.component';

describe('ModifierInfosUserComponent', () => {
  let component: ModifierInfosUserComponent;
  let fixture: ComponentFixture<ModifierInfosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifierInfosUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierInfosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
