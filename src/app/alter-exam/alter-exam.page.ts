import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ExamServiceService } from '../exam-service.service';

@Component({
  selector: 'app-alter-exam',
  templateUrl: './alter-exam.page.html',
  styleUrls: ['./alter-exam.page.scss'],
})
export class AlterExamPage implements OnInit {

  examForm = this.fb.group({
    score: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
    course: ['', [Validators.required]],
    semester: [0, [Validators.required]]
  })
  selectedSemester = 0;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private examService: ExamServiceService,
  ) { }

  ngOnInit() {
  }
  
  selectSemester(value: number) {
    this.selectedSemester = value;
    this.examForm.patchValue({ semester: value });
  }

  saveExam(): void {
    if (this.examForm.valid) {
      const score = this.examForm.get('score')?.value;
      const course = this.examForm.get('course')?.value;
      const semester = this.selectedSemester;

      if (score && semester && course) {

        // New Exam
        const newExam = {
          score: score,
          course: course,
          semester: semester,
        }
        //  Add to service list
        this.examService.addExam(newExam);

        // reset values
        this.examForm.reset();

      }
    }
    else {
      this.presentToast("Please fill in the form correctly");
    }
  }
  updateExam(): void {
    if (this.examForm.valid) {
      const score = this.examForm.get('score')?.value;
      const course = this.examForm.get('course')?.value;
      const semester = this.examForm.get('semester')?.value;

      if (score && semester && course) {

        // New Exam
        const newExam = {
          score: score,
          course: course,
          semester: semester,
        }
        //  Add to service list
        this.examService.addExam(newExam);

        // reset values
        this.examForm.reset();

      }
    }
    else {
      this.presentToast("Please fill in the form correctly");
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      position: "bottom",
      duration: 3000
    });

    toast.present();
  }


}
