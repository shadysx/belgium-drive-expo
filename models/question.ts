export interface Question {
  id: string;
  title: string;
  text: string;
  imageUri?: string;
  answers: string[];
  answerIndex: number;
  category: string;
  explanation?: string;
  creationDate: string;
  isSerious: boolean;
  thumbnailUri?: string;
}
