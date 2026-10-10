import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { Course } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly baseUrl = `${API_BASE_URL}/courses`;

  constructor(private http: HttpClient) {}

  getAll(search?: string, category?: string): Observable<Course[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (category) params = params.set('category', category);
    return this.http.get<Course[]>(this.baseUrl, { params });
  }

  getById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  create(course: Partial<Course>): Observable<{ msg: string; newcourse: Course }> {
    return this.http.post<{ msg: string; newcourse: Course }>(this.baseUrl, course);
  }

  update(id: string, course: Partial<Course>): Observable<{ msg: string; course: Course }> {
    return this.http.put<{ msg: string; course: Course }>(`${this.baseUrl}/${id}`, course);
  }

  delete(id: string): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.baseUrl}/${id}`);
  }
}
