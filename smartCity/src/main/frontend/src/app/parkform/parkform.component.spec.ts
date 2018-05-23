import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkformComponent } from './parkform.component';

describe('ParkformComponent', () => {
  let component: ParkformComponent;
  let fixture: ComponentFixture<ParkformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
