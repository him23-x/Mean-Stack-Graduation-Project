import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth';
import { EnrollmentService } from './services/enrollment';
import { ToastComponent } from './components/toast/toast';

const PUBLIC_ROUTES = ['/login', '/register'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  showChrome = signal(false);
  private countLoaded = false;

  constructor(
    private auth: AuthService,
    private enrollmentService: EnrollmentService,
    private router: Router,
  ) {}

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  get enrolledCount(): number {
    return this.enrollmentService.count();
  }

  ngOnInit(): void {
    this.updateChrome(this.router.url);

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.updateChrome(event.urlAfterRedirects);
    });

    if (this.auth.isLoggedIn() && !this.auth.isAdmin()) {
      this.loadEnrolledCount();
    }
  }

  private updateChrome(url: string): void {
    const isPublicRoute = PUBLIC_ROUTES.some((route) => url.startsWith(route));
    const shouldShow = this.auth.isLoggedIn() && !isPublicRoute;
    this.showChrome.set(shouldShow);

    if (shouldShow && !this.auth.isAdmin()) {
      this.loadEnrolledCount();
    }
  }

  private loadEnrolledCount(): void {
    if (this.countLoaded) return;
    this.countLoaded = true;

    this.enrollmentService.getMy().subscribe({
      error: () => (this.countLoaded = false),
    });
  }

  logout(): void {
    this.auth.logout();
    this.countLoaded = false;
    this.enrollmentService.count.set(0);
    this.router.navigate(['/login']);
  }
}
