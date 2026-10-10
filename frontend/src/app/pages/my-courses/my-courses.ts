import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Enrollment } from '../../models';
import { ToastService } from '../../components/toast/toast';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-courses.html',
  styleUrl: './my-courses.css',
})
export class MyCourses implements OnInit {
  enrollments = signal<Enrollment[]>([]);
  error = signal('');

  constructor(
    private toast: ToastService,
    private enrollmentService: EnrollmentService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.enrollmentService.getMy().subscribe({
      next: (enrollments) => this.enrollments.set(enrollments),
      error: (err) => this.error.set(err.error?.msg || 'Failed to load enrollments'),
    });
  }

  cancelEnrollment(enrollment: Enrollment): void {
    this.enrollmentService.cancel(enrollment._id).subscribe({
      next: () => {
        this.enrollments.set(this.enrollments().filter((e) => e._id !== enrollment._id));
        this.toast.show(`Enrollment for ${enrollment.courseId.title} has been cancelled.`, 'info');
      },
      error: (err) => this.toast.show(err.error?.msg || 'Failed to cancel enrollment', 'error'),
    });
  }
}
