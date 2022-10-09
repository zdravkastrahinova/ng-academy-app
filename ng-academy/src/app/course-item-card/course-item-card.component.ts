import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseModel } from '../models/course.model';

@Component({
  selector: 'app-course-item-card',
  templateUrl: './course-item-card.component.html',
  styleUrls: ['./course-item-card.component.scss']
})
export class CourseItemCardComponent {

  @Input() course: CourseModel;

  @Output() clicked: EventEmitter<CourseModel> = new EventEmitter<CourseModel>();

  constructor() { }

  onClick(): void {
    this.clicked.emit(this.course);
  }
}
