import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Course } from '../../models';
import { ToastService } from '../../components/toast/toast';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { AuthService } from '../../services/auth';

const SEARCH_DEBOUNCE_MS = 300;

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  searchTerm = signal('');
  selectedCategory = signal('All');

  courses = signal<Course[]>([]);
  categories = signal<string[]>(['All']);
  error = signal('');

  private searchDebounce?: ReturnType<typeof setTimeout>;

  constructor(
    private toast: ToastService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private auth: AuthService,
  ) {}

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.fetchCourses();
  }

  private loadCategories(): void {
    this.courseService.getAll().subscribe({
      next: (courses) => {
        const extractedCategories = courses
          .map((course) => course.category)
          .filter((category): category is string => Boolean(category));
        this.categories.set(['All', ...new Set(extractedCategories)]);
      },
    });
  }

  private fetchCourses(): void {
    const category = this.selectedCategory() === 'All' ? undefined : this.selectedCategory();

    this.courseService.getAll(this.searchTerm(), category).subscribe({
      next: (courses) => this.courses.set(courses),
      error: (err) => this.error.set(err.error?.msg || 'Failed to load courses'),
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);

    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => this.fetchCourses(), SEARCH_DEBOUNCE_MS);
  }

  onCategoryChange(category: string): void {
    this.selectedCategory.set(category);
    this.fetchCourses();
  }

  enroll(course: Course): void {
    this.enrollmentService.create(course._id).subscribe({
      next: () => this.toast.show(`Successfully enrolled in ${course.title}!`, 'success'),
      error: (err) => this.toast.show(err.error?.msg || 'Failed to enroll', 'error'),
    });
  }

  deleteCourse(course: Course): void {
    this.courseService.delete(course._id).subscribe({
      next: () => {
        this.toast.show(`${course.title} deleted`, 'info');
        this.fetchCourses();
      },
      error: (err) => this.toast.show(err.error?.msg || 'Failed to delete course', 'error'),
    });
  }
}
