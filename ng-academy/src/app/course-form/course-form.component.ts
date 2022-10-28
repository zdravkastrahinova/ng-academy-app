import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseModel } from '../models/course.model';
import { CategoryModel } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  formGroup: FormGroup
  
  course: CourseModel;
  categories: CategoryModel[];

  constructor(
    private fb: FormBuilder, 
    private coursesService: CoursesService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoriesService.getAll$().subscribe({
      next: (response: CategoryModel[]) => {
        this.categories = response;
      }
    });

    this.buildForm();

    const id = this.route.snapshot.params.id;
    if (id) {
      this.coursesService.getById$(id).subscribe({
        next: (response: CourseModel) => {
          this.course = response;
          this.buildForm();
        }
      });
    }
  }

  onSubmit(): void {
    if(!this.formGroup.valid) {
      return;
    }

    const data = {
      ...this.formGroup.value,
      categoryId: parseInt(this.formGroup.value.categoryId)
    };

    if (data.id) {
      // update
      this.coursesService.put$(data).subscribe({
        next: () => {
          this.router.navigate(['/list']);
        }
      });
    } else {
      // create
      this.coursesService.post$(data).subscribe({
        next: () => {
          // navigate back to list
          this.router.navigate(['/list']);
        }
      });
    }
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      id: this.course?.id,
      name: [this.course?.name, [Validators.required]],
      description: this.course?.description,
      categoryId: this.course?.categoryId
    });
  }
}
