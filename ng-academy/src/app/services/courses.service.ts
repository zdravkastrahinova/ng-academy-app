import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    url = 'http://localhost:3000/courses';

    constructor(private http: HttpClient) {
    }

    getAll$(): Observable<CourseModel[]> {
        return this.http.get<CourseModel[]>(this.url);
    }

    post$(body: CourseModel): Observable<CourseModel> {
        return this.http.post<CourseModel>(this.url, body);
    }
}