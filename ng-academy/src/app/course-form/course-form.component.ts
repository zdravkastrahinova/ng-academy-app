import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder, 
    private coursesService: CoursesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      description: ''
    });
  }

  onSubmit(): void {
    if(!this.formGroup.valid) {
      return;
    }

    const data = {
      name: this.formGroup.value.name,
      description: this.formGroup.value.description,
      categoryId: 1
    };

    this.coursesService.post$(data).subscribe({
      next: () => {
        // navigate back to list
        this.router.navigate(['/list']);
      }
    });
  }
}
