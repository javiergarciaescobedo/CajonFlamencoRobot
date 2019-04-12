import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayControlPage } from './play-control.page';

describe('PlayControlPage', () => {
  let component: PlayControlPage;
  let fixture: ComponentFixture<PlayControlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayControlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
