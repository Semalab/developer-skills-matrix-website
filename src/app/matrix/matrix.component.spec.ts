import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
