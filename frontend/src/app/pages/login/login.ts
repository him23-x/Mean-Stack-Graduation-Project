import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  error = signal('');

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  submit(): void {
    this.error.set('');

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        if (this.auth.isAdmin()) {
          this.router.navigate(['/admin/courses']);
        } else {
          this.router.navigate(['/courses']);
        }
      },
      error: (err) => {
        this.error.set(err.error?.msg || 'Login failed');
      },
    });
  }
}
