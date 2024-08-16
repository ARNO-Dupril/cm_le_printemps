import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/server/auth.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ServiceService } from './services/service/service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular';

  private routerSubscription: Subscription | null = null;
  private currentUrl: string = '';

  isDashboard: boolean = false;

  constructor(private authService: AuthService, private router: Router, private service: ServiceService) {}

  
  ngOnInit() {
    this.authService.verifyAuth();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrl = this.router.url;
        this.updateIsDashboard();
      });
      // Initialiser la valeur de isDashboard lors du premier chargement
      this.updateIsDashboard();

      //  Initialiser le tableau des services
      this.service.loadServices();
      //  Initialiser le tableau des services
      this.service.loadUsers();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  updateIsDashboard(): void {
    this.isDashboard = this.isDashboardActive();
  }

  isDashboardActive(): boolean {
    return this.currentUrl.startsWith('/dashboard/');
  }
}