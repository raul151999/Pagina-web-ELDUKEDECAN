import { Component, HostListener, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GlobalSearchComponent } from '../../components/global-search/global-search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, GlobalSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOpen = signal(false);
  scrolled = signal(false);
  expandedMenu = signal<string | null>(null);

  private routerSub!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenu();
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 50);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);

    if (this.menuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      this.expandedMenu.set(null);
    }
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.expandedMenu.set(null);
    document.body.style.overflow = '';
  }

  toggleSubmenu(menuName: string, event: Event): void {
    event.preventDefault();
    this.expandedMenu.update(current => current === menuName ? null : menuName);
  }
}
