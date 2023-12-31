import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTopicsComponent } from './view-topics.component';

describe('ViewTopicsComponent', () => {
  let component: ViewTopicsComponent;
  let fixture: ComponentFixture<ViewTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTopicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
