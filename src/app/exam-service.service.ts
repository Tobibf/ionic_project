import { Injectable } from '@angular/core';
import { Exam } from './home/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamServiceService {

  examsList: Exam[] = []; // all of the exam results

  constructor() { }

  addExam(exam: Exam): void {
    this.examsList.unshift({ ...exam });
  }
  updateExam(exam: Exam): void { }
  delete(exam: Exam): void { }

  getExams(): Exam[] {
    return [...this.examsList];
  }
}
