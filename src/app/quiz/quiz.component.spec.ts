import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockMatrixData } from 'src/mocks/MockMatrix';

import { QuizComponent } from './quiz.component';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the expected properties', () => {
    expect(component.data).toBeDefined();
    expect(component.loaded).toBeDefined();
    expect(component.results).toBeDefined();
    expect(component.currentQuestion).toBeDefined();
    expect(component.complete).toBeDefined();
  });

  it('should render the introduction text', () => {
    const p = compiled.querySelector('p');
    expect(p.textContent).toContain(
      'Assess your skills below! Select the button for each category which best describes your current situation and ability.'
    );
  });

  it('should display a loading indicator', () => {
    component.loaded = false;
    fixture.detectChanges();
    const ps = compiled.querySelectorAll('p');
    expect(ps.length).toBe(2);
    expect(ps[1].textContent).toContain('Loading...');
  });

  it('should render the quiz', () => {
    component.loaded = true;
    component.data = MockMatrixData;
    component.complete = false;
    fixture.detectChanges();
    const category = compiled.querySelector('.category');
    expect(category.textContent).toContain('Test');
    const subCategory = compiled.querySelector('.subcategory');
    expect(subCategory.textContent).toContain('First');
    const grid = compiled.querySelector('.grid');
    expect(grid.children.length).toBe(5);
    expect(grid.children[0].textContent).toContain('Test');
    expect(grid.children[1].textContent).toContain('Test');
    expect(grid.children[2].textContent).toContain('Test');
    expect(grid.children[3].textContent).toContain('Test');
    expect(grid.children[4].textContent).toContain('Test');
    expect(grid.children[0].children[0].tagName).toBe('BUTTON');
    expect(grid.children[0].children[0].textContent).toContain('Beginner');
    expect(grid.children[1].children[0].tagName).toBe('BUTTON');
    expect(grid.children[1].children[0].textContent).toContain(
      'Advanced Beginner'
    );
    expect(grid.children[2].children[0].tagName).toBe('BUTTON');
    expect(grid.children[2].children[0].textContent).toContain('Intermediate');
    expect(grid.children[3].children[0].tagName).toBe('BUTTON');
    expect(grid.children[3].children[0].textContent).toContain('Advanced');
    expect(grid.children[4].children[0].tagName).toBe('BUTTON');
    expect(grid.children[4].children[0].textContent).toContain('Expert');
  });

  it('should update the table when an answer is submitted', () => {
    component.loaded = true;
    component.data = MockMatrixData;
    component.complete = false;
    fixture.detectChanges();
    const subCategory = compiled.querySelector('.subcategory');
    expect(subCategory.textContent).toContain('First');
    component.answer('Beginner');
    fixture.detectChanges();
    expect(subCategory.textContent).toContain('Second');
    const category = compiled.querySelector('.category');
    expect(category.textContent).toContain('Test');
    const grid = compiled.querySelector('.grid');
    expect(grid.children.length).toBe(5);
    expect(grid.children[0].textContent).toContain('Beginner');
    expect(grid.children[1].textContent).toContain('Advanced Beginner');
    expect(grid.children[2].textContent).toContain('Intermediate');
    expect(grid.children[3].textContent).toContain('Advanced');
    expect(grid.children[4].textContent).toContain('Expert');
    expect(grid.children[0].children[0].tagName).toBe('BUTTON');
    expect(grid.children[0].children[0].textContent).toContain('Beginner');
    expect(grid.children[1].children[0].tagName).toBe('BUTTON');
    expect(grid.children[1].children[0].textContent).toContain(
      'Advanced Beginner'
    );
    expect(grid.children[2].children[0].tagName).toBe('BUTTON');
    expect(grid.children[2].children[0].textContent).toContain('Intermediate');
    expect(grid.children[3].children[0].tagName).toBe('BUTTON');
    expect(grid.children[3].children[0].textContent).toContain('Advanced');
    expect(grid.children[4].children[0].tagName).toBe('BUTTON');
    expect(grid.children[4].children[0].textContent).toContain('Expert');
    expect(component.results.length).toBe(1);
    expect(component.results[0]).toEqual({
      category: 'Test',
      subcategory: 'First',
      response: 'Beginner',
    });
  });

  it('should display the results when complete', () => {
    component.loaded = true;
    component.data = MockMatrixData;
    component.complete = false;
    component.answer('Beginner');
    component.answer('Advanced');
    fixture.detectChanges();
    expect(component.results.length).toBe(2);
    expect(component.results[0]).toEqual({
      category: 'Test',
      subcategory: 'First',
      response: 'Beginner',
    });
    expect(component.results[1]).toEqual({
      category: 'Test',
      subcategory: 'Second',
      response: 'Advanced',
    });
    const category = compiled.querySelector('.category');
    expect(category.textContent).toContain('Your Results');
    const subCategory = compiled.querySelector('.subcategory');
    expect(subCategory).toBeNull();
    const table = compiled.querySelector('table');
    expect(table.children.length).toBe(2);
    const header = table.children[0];
    expect(header.children[0].children.length).toBe(3);
    expect(header.children[0].children[0].textContent).toContain('Category');
    expect(header.children[0].children[1].textContent).toContain('SubCategory');
    expect(header.children[0].children[2].textContent).toContain('Your Response');
    const body = table.children[1];
    expect(body.children.length).toBe(2);
    expect(body.children[0].children.length).toBe(3);
    expect(body.children[0].children[0].textContent).toContain('Test');
    expect(body.children[0].children[1].textContent).toContain('First');
    expect(body.children[0].children[2].textContent).toContain('Beginner');
    expect(body.children[1].children.length).toBe(3);
    expect(body.children[1].children[0].textContent).toContain('Test');
    expect(body.children[1].children[1].textContent).toContain('Second');
    expect(body.children[1].children[2].textContent).toContain('Advanced');
  })
});
