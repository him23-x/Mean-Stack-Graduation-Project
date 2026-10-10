import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import { AppUser } from '../../models';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users = signal<AppUser[]>([]);
  error = signal('');

  constructor(
    private userService: UserService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.userService.getAll().subscribe({
      next: (users) => this.users.set(users),
      error: (err) => this.error.set(err.error?.msg || 'Failed to load users'),
    });
  }

  currentUserId(): string | undefined {
    return this.auth.getUser()?._id;
  }

  toggleRole(user: AppUser): void {
    const newRole = user.role === 'admin' ? 'student' : 'admin';

    this.userService.updateRole(user._id, newRole).subscribe({
      next: () => this.load(),
      error: (err) => this.error.set(err.error?.msg || 'Failed to update role'),
    });
  }
}
