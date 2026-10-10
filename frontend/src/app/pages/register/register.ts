import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  error = signal('');
  success = signal('');

  constructor(private auth: AuthService) {}

  submit(): void {
    this.error.set('');
    this.success.set('');

    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.success.set('Registration successful. Please log in.');
      },
      error: (err) => {
        this.error.set(err.error?.msg || 'Registration failed');
      },
    });
  }
}
