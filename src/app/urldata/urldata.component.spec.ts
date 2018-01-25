import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UrldataComponent} from './urldata.component';

describe('UrldataComponent', () => {
  let component: UrldataComponent;
  let fixture: ComponentFixture<UrldataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrldataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
