export interface Matrix {
  [key: string]: {
    [key: string]: {
      Beginner: string;
      'Advanced Beginner': string;
      Intermediate: string;
      Advanced: string;
      Expert: string;
    };
  };
}

export interface MatrixData {
  category: string;
  subcategory: string;
  Beginner: string;
  'Advanced Beginner': string;
  Intermediate: string;
  Advanced: string;
  Expert: string;
}
