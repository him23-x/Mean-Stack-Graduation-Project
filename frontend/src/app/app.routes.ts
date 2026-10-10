import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Courses } from './pages/courses/courses';
import { MyCourses } from './pages/my-courses/my-courses';
import { Profile } from './pages/profile/profile';
import { CourseForm } from './pages/course-form/course-form';
import { Users } from './pages/users/users';
import { adminGuard } from './guards/admin-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'courses', component: Courses, canActivate: [authGuard] },
  { path: 'my-courses', component: MyCourses, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'admin/courses', component: Courses, canActivate: [adminGuard] },
  { path: 'admin/courses/new', component: CourseForm, canActivate: [adminGuard] },
  { path: 'admin/courses/:id/edit', component: CourseForm, canActivate: [adminGuard] },
  { path: 'admin/users', component: Users, canActivate: [adminGuard] },
  { path: '**', redirectTo: 'login' },
];
