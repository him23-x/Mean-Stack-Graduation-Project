import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { AppUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${API_BASE_URL}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.baseUrl);
  }

  getProfile(): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.baseUrl}/profile`);
  }

  updateProfile(data: { name?: string; email?: string; password?: string }): Observable<{ msg: string; user: AppUser }> {
    return this.http.patch<{ msg: string; user: AppUser }>(`${this.baseUrl}/profile`, data);
  }

  updateRole(id: string, role: 'student' | 'admin'): Observable<{ msg: string; user: AppUser }> {
    return this.http.patch<{ msg: string; user: AppUser }>(`${this.baseUrl}/${id}/role`, { role });
  }
}
