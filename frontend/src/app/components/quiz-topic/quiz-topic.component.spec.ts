import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTopicComponent } from './quiz-topic.component';

describe('QuizTopicComponent', () => {
  let component: QuizTopicComponent;
  let fixture: ComponentFixture<QuizTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
