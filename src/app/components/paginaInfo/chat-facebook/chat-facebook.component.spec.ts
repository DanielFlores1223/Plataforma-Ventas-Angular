import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFacebookComponent } from './chat-facebook.component';

describe('ChatFacebookComponent', () => {
  let component: ChatFacebookComponent;
  let fixture: ComponentFixture<ChatFacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatFacebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
