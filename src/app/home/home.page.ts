import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ExamServiceService } from '../exam-service.service';
import { Exam } from './exam.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Variables
  examsList: Exam[] = []; // all of the exam results
  averageCheck: boolean = false;
  semesterNumber: String = '';
  numberCourses: number = 0;
  totalMark: number = 0;
  average: number = 0;

  constructor(
    private navController: NavController,
    private examService: ExamServiceService,
  ) { }
  ngOnInit() {
    this.examsList = this.examService.getExams();
  }

  // Functions
  deleteExam(){
    // this.examsList.delete();
  }

  // Forward to next page
  goToExam() {
    this.navController.navigateForward('/alter-exam');
  }
}
