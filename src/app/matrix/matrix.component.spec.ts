import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockMatrixData } from 'src/mocks/MockMatrix';

import { MatrixComponent } from './matrix.component';

describe('MatrixComponent', () => {
  let component: MatrixComponent;
  let fixture: ComponentFixture<MatrixComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatrixComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(MatrixComponent);
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
  });

  it('should show a loading message', () => {
    component.loaded = false;
    fixture.detectChanges();
    const p = compiled.querySelector('p');
    expect(p.textContent).toContain('Loading matrix...');
  });

  it('should render the table header', () => {
    component.data = MockMatrixData;
    component.loaded = true;
    fixture.detectChanges();
    const headerRow = compiled.querySelector('thead tr');
    expect(headerRow.children.length).toBe(7);
    expect(headerRow.children[0].textContent).toContain('Category');
    expect(headerRow.children[1].textContent).toContain('SubCategory');
    expect(headerRow.children[2].textContent).toContain('Beginner');
    expect(headerRow.children[3].textContent).toContain('Advanced Beginner');
    expect(headerRow.children[4].textContent).toContain('Intermediate');
    expect(headerRow.children[5].textContent).toContain('Advanced');
    expect(headerRow.children[6].textContent).toContain('Expert');
  })

  it('should render the table data', () => {
    component.data = MockMatrixData;
    component.loaded = true;
    fixture.detectChanges();
    const tableBody = compiled.querySelector('tbody');
    const rows = tableBody.querySelectorAll('tr');
    expect(rows.length).toBe(2);
    const row1 = rows[0];
    expect(row1.children.length).toBe(7);
    expect(row1.children[0].textContent).toContain('Test');
    expect(row1.children[1].textContent).toContain('First');
    expect(row1.children[2].textContent).toContain('Test');
    expect(row1.children[3].textContent).toContain('Test');
    expect(row1.children[4].textContent).toContain('Test');
    expect(row1.children[5].textContent).toContain('Test');
    expect(row1.children[6].textContent).toContain('Test');
    const row2 = rows[1];
    expect(row2.children.length).toBe(7);
    expect(row2.children[0].textContent).toContain('Test');
    expect(row2.children[1].textContent).toContain('Second');
    expect(row2.children[2].textContent).toContain('Beginner');
    expect(row2.children[3].textContent).toContain('Advanced Beginner');
    expect(row2.children[4].textContent).toContain('Intermediate');
    expect(row2.children[5].textContent).toContain('Advanced');
    expect(row2.children[6].textContent).toContain('Expert');
  })
});
