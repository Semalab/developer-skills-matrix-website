import { Component, OnInit } from '@angular/core';
import { MatrixData } from 'src/interfaces/Matrix';
import { GetMatrixService } from '../get-matrix.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css'],
})
export class MatrixComponent implements OnInit {
  public data: MatrixData[] | null = null;
  public loaded = false;

  constructor(private getMatrixService: GetMatrixService) {}

  ngOnInit(): void {
    this.getMatrixService.getData().subscribe((data) => {
      const result: MatrixData[] = []
      for (const category in data) {
        for (const subcategory in data[category]) {
          result.push({
            category,
            subcategory,
            ...data[category][subcategory],
          });
        }
      }
      this.data = result;
      this.loaded = true;
    });
  }
}
