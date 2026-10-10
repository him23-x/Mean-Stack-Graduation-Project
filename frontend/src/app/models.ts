export interface Course {
  _id: string;
  title: string;
  description?: string;
  instructor: string;
  category?: string;
  credits: number;
  seats: number;
}

export interface AppUser {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface AuthResponse {
  msg: string;
  user: AppUser;
  token: string;
}

export interface Enrollment {
  _id: string;
  userId: string;
  courseId: Course;
}
