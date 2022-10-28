import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  courses: CourseModel[];
  favoriteCourse: CourseModel;

   constructor(private coursesService: CoursesService) {
   }

   ngOnInit(): void {
     this.coursesService.getAll$().subscribe({
       next: (response: CourseModel[]) => {
         this.courses = response;
       }
     });
   }

   onItemClick(course: CourseModel): void {
     this.favoriteCourse = course;
   }

   onItemDeleted(id: number): void {
     this.coursesService.delete$(id).subscribe({
       next: () => {
         this.courses = this.courses.filter(c => c.id !== id);
       }
     });
   }
}
