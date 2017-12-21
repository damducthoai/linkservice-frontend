import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlResultsComponent } from './url-results.component';

describe('UrlResultsComponent', () => {
  let component: UrlResultsComponent;
  let fixture: ComponentFixture<UrlResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
