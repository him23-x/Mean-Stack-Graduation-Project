import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import { AppUser } from '../../models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user = signal<AppUser | null>(null);
  isEditing = signal(false);
  error = signal('');
  editData = { name: '', email: '' };

  constructor(
    private auth: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => this.user.set(user),
      error: (err) => this.error.set(err.error?.msg || 'Failed to load profile'),
    });
  }

  toggleEdit(): void {
    if (!this.isEditing()) {
      const current = this.user();
      this.editData = { name: current?.name || '', email: current?.email || '' };
    }
    this.isEditing.update((val) => !val);
  }

  saveChanges(): void {
    this.userService.updateProfile(this.editData).subscribe({
      next: (res) => {
        this.user.set(res.user);
        this.auth.setUser(res.user);
        this.isEditing.set(false);
      },
      error: (err) => this.error.set(err.error?.msg || 'Failed to update profile'),
    });
  }
}
