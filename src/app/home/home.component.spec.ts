import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const h1 = compiled.querySelector('h1');
    expect(h1.textContent).toContain('Developer Skills Matrix');
  });

  it('should render the introduction text', () => {
    const ps = compiled.querySelectorAll('p');
    expect(ps.length).toBe(2);
    expect(ps[0].textContent).toContain(
      "Welcome to Sema's Developer Skills Matrix!"
    );
    expect(ps[1].textContent).toContain(
      'This is a self-assessment tool designed to allow you to gauge where you are at in your development journey.'
    );
  });

  it('should render the navigation buttons', () => {
    const buttons = compiled.querySelectorAll('a');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('View the Matrix');
    expect(buttons[1].textContent).toContain('Take the Self Assessment');
    expect(buttons[0].getAttribute('routerLink')).toBe('/matrix');
    expect(buttons[1].getAttribute('routerLink')).toBe('/quiz');
  });
});
