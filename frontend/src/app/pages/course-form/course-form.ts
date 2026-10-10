import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { Course } from '../../models';

@Component({
  selector: 'app-course-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm implements OnInit {
  isEdit = false;
  courseId = '';
  error = '';

  course: Partial<Course> = {
    title: '',
    description: '',
    instructor: '',
    category: '',
    credits: 3,
    seats: 30,
  };

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.isEdit = true;
    this.courseId = id;

    this.courseService.getById(id).subscribe({
      next: (course) => {
        this.course = course;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = err.error?.msg || 'Failed to load course';
        this.cdr.markForCheck();
      },
    });
  }

  submit(): void {
    const onSuccess = () => this.router.navigate(['/admin/courses']);
    const onError = (err: { error?: { msg?: string } }) => {
      this.error = err.error?.msg || 'Failed to save course';
      this.cdr.markForCheck();
    };

    if (this.isEdit) {
      this.courseService.update(this.courseId, this.course).subscribe({ next: onSuccess, error: onError });
    } else {
      this.courseService.create(this.course).subscribe({ next: onSuccess, error: onError });
    }
  }
}
