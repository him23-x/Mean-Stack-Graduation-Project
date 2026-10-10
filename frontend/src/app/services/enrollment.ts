import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { Enrollment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private readonly baseUrl = `${API_BASE_URL}/enrollments`;
  count = signal(0);

  constructor(private http: HttpClient) {}

  getMy(): Observable<Enrollment[]> {
    return this.http
      .get<Enrollment[]>(`${this.baseUrl}/my`)
      .pipe(tap((enrollments) => this.count.set(enrollments.length)));
  }

  create(courseId: string): Observable<{ msg: string; enrollment: Enrollment }> {
    return this.http
      .post<{ msg: string; enrollment: Enrollment }>(this.baseUrl, { courseId })
      .pipe(tap(() => this.count.update((c) => c + 1)));
  }

  cancel(id: string): Observable<{ msg: string }> {
    return this.http
      .delete<{ msg: string }>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => this.count.update((c) => Math.max(0, c - 1))));
  }
}
