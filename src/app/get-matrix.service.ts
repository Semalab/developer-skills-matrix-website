import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Matrix } from 'src/interfaces/Matrix';

const URL =
  'https://raw.githubusercontent.com/Semalab/developer-skills-matrix/main/rubric/rubric.json';

@Injectable({
  providedIn: 'root',
})
export class GetMatrixService {
  public cache = new Map();
  constructor(private http: HttpClient) {}

  public getData(): Observable<Matrix> {
    const dataFromCache = this.cache.get(URL);
    if (dataFromCache) {
      return of(dataFromCache);
    }

    const response = this.http.get<Matrix>(URL);
    response.subscribe((data) => this.cache.set(URL, data));
    return response;
  }
}
