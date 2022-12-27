import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private storage: Storage) {
    this.storage.create();
    this.semestersInit();
    this.coursesInit();

    //pour test
    this.storage.set(MARK_KEY, marks);
  }

  //operation sur les cours
  coursesInit() {
    this.storage.set(COURSES_KEY, courses);
  }

  getCourses(): Promise<any> {
    return this.storage.get(COURSES_KEY);
  }

  getCourse(courseId: number): Promise<any> {
    return this.storage.get(COURSES_KEY)
      .then((courses: Course[]) => {
        for (let c of courses) {
          if (c.id == courseId) {
            this.storage.set('c', c);
            return this.storage.get('c');
          }
        }
        return null;
      });
  }

  getSemesterCourses(id: number): Promise<any> {
    this.storage.get(COURSES_KEY)
      .then((courses: Course[]) => {
        let semesterCourses: Course[] = [];
        for (let course of courses) {
          if (course.semester.id == id) {
            semesterCourses.push(course);
          }
        }
        this.storage.set('coursDuSemestre', semesterCourses);
      });
    return this.storage.get('coursDuSemestre');
  }


  //operation sur les semestres
  getSemesters(): Promise<any> {
    return this.storage.get(SEMESTER_KEY);
  }

  semestersInit(): void {
    this.storage.set(SEMESTER_KEY, semesters);
  }

  //operations sur les notes
  addMark(mark: Mark): Promise<any> {
    return this.storage.get(MARK_KEY)
      .then((marks: Mark[]) => {
        mark.id = marks[marks.length].id + 1
        if (marks) {
          marks.push(mark);
          return this.storage.set(MARK_KEY, marks)
        } else {
          return this.storage.set(MARK_KEY, [mark])
        }
      })
  }

  getMarks(): Promise<any> {
    return this.storage.get(MARK_KEY);
  }

  getMark(markId: number): Promise<any> {
    return this.storage.get(MARK_KEY)
      .then((marks: Mark[]) => {
        for (let m of marks) {
          if (m.id == markId) {
            return m;
          }
        }
        return null;
      })
  }

  getMarkOfSemester(semesterId: number): Promise<any> {
    this.storage.get(MARK_KEY)
      .then((marks: Mark[]) => {
        let semesterMarks: Mark[] = []
        for (let m of marks) {
          if (m.course.semester.id == semesterId) {
            semesterMarks.push(m);
          }
        }
        this.storage.set('d', semesterMarks)
      });
    return this.storage.get('d');
  }

  /*myFunction(marks:Mark[], id:number):Mark[]{
    let courseMarks:Mark[]=[];
    for(let mark of marks){
      if(mark.course.id==id){
        courseMarks.push(mark);
      }
    }
    return courseMarks;
  }

  getMarksOfCourse(id:number):Promise<any>{
    this.storage.get(MARK_KEY)
      .then((marks:Mark[])=>{
        this.storage.set('notesCours', this.myFunction(marks,id));
      });
      return this.storage.get('notesCours');
  }*/

  getMarksOfCourse(courseId: number): Promise<any> {
    this.storage.get(MARK_KEY)
      .then((marks: Mark[]) => {
        let courseMarks: Mark[] = [];
        for (let m of marks) {
          console.log("id 1 " + m.course['id']);
          console.log("id 2 " + courseId);
          if (m.course['id'] == courseId) {

            courseMarks.push(m);
          }
        }
        this.storage.set('notesDuCours', courseMarks);
        console.log(courseMarks);
      });
    return this.storage.get('notesDuCours');
  }


  updateMark(mark: Mark): Promise<any> {
    return this.storage.get(MARK_KEY)
      .then((marks: Mark[]) => {
        if (!marks || marks.length == 0) {
          return null;
        }
        let newMarks: Mark[] = [];
        for (let m of marks) {
          if (m.id == mark.id) {
            newMarks.push(mark);
          } else {
            newMarks.push(m);
          }
        }
        return this.storage.set(MARK_KEY, newMarks);
      })
  }

  deleteMark(mark: Mark): Promise<any> {
    return this.storage.get(MARK_KEY)
      .then((marks: Mark[]) => {
        if (!marks || marks.length == 0) {
          return null;
        }
        let remainings: Mark[] = [];
        for (let m of marks) {
          if (!(m.id == mark.id)) {
            remainings.push(mark);
          }
        }
        return this.storage.set(MARK_KEY, remainings);
      })
  }
}

const MARK_KEY = 'marks';
const SEMESTER_KEY = 'semesters';
const COURSES_KEY = 'courses';

const semesters: Semester[] = [{ id: 0, name: 'IC1-s1' }, { id: 1, name: 'IC1-s2' }, { id: 2, name: 'IC2-s1' }, { id: 3, name: 'IC2-s2' }, { id: 4, name: 'IC3-s1' }, { id: 5, name: 'IC3-s2' }]
const courses: Course[] = [
  { name: 'math pour ingenieur', semester: semesters[0], id: 1, coef: 2 },
  { name: 'java', semester: semesters[0], id: 2, coef: 2 },
  { name: 'electromagnetisme', semester: semesters[0], id: 3, coef: 2 },
  { name: 'lcs', semester: semesters[0], id: 4, coef: 2 },
  { name: 'AOP', semester: semesters[1], id: 5, coef: 2 },
  { name: 'projet', semester: semesters[1], id: 6, coef: 2 },
  { name: 'traitement signal', semester: semesters[2], id: 7, coef: 2 },
  { name: 'transmission herztienne', semester: semesters[3], id: 8, coef: 2 },
  { name: 'applications mobiles', semester: semesters[4], id: 9, coef: 2 },
  { name: 'stage ingenieur', semester: semesters[5], id: 10, coef: 2 }
];

const marks: Mark[] = [
  { evaluationType: 'devoir', id: 1, score: 13, course: { name: 'math pour ingenieur', semester: semesters[0], id: 1, coef: 2 } },
  { evaluationType: 'tp', id: 2, score: 13, course: { name: 'math pour ingenieur', semester: semesters[0], id: 1, coef: 2 } },
  { evaluationType: 'devoir', id: 3, score: 13, course: { name: 'java', semester: semesters[0], id: 2, coef: 2 } },
  { evaluationType: 'tp', id: 4, score: 13, course: { name: 'java', semester: semesters[0], id: 2, coef: 2 } },
  { evaluationType: 'devoir', id: 5, score: 13, course: { name: 'AOP', semester: semesters[1], id: 5, coef: 2 } },
  { evaluationType: 'tp', id: 6, score: 13, course: { name: 'AOP', semester: semesters[1], id: 5, coef: 2 } },
];
export interface Mark {
  evaluationType: string;
  id: number;
  score: number;
  course: Course;
}

export interface Semester {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  semester: Semester;
  coef: number;
}}
