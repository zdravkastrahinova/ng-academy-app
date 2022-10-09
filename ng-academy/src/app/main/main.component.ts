import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../models/course.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  courses: CourseModel[];
  favoriteCourse: CourseModel;

  constructor() {
    this.courses = [
      {
        name: 'Angular course',
        description: 'Angular basics course description'
      },
      {
        name: 'React course',
        description: 'React course description'
      },
      {
        name: 'C#'
      }
    ];
   }

   onItemClick(course: CourseModel): void {
     this.favoriteCourse = course;
   }
}
