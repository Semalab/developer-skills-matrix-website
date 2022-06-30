import { Component, OnInit } from '@angular/core';
import { MatrixData } from 'src/interfaces/Matrix';
import { GetMatrixService } from '../get-matrix.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public data: MatrixData[] | null = null;
  public loaded = false;
  public results: {category: string, subcategory: string, response: string}[] = [];
  public currentQuestion = 0;
  public complete = false;

  constructor(private getMatrixService: GetMatrixService) {}

  ngOnInit(): void {
    this.getMatrixService.getData().subscribe((data) => {
      const result: MatrixData[] = []
      for (const category in data) {
        for (const subcategory in data[category]) {
          if (subcategory === "Where they are likely to be found") {
            continue;
          }
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

  public answer(answer: string) {
    if (!this.data) {
      return;
    }
    const { category, subcategory } = this.data[this.currentQuestion];
    const resultObject = {
      category,
      subcategory,
      response: answer,
    }
    this.results.push(resultObject);
    this.currentQuestion++;
    if (this.currentQuestion >= this.data.length) {
      this.complete = true;
    }
  }
}
