import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { ContactFooterComponent } from './layout/contact-footer/contact-footer.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';
import { WhatsappFabComponent } from './shared/components/whatsapp-fab/whatsapp-fab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ContactFooterComponent,
    ScrollToTopComponent,
    WhatsappFabComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.initScrollReveal(), 100);
      }
    });
  }

  ngAfterViewInit() {
    this.initScrollReveal();
  }

  initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
  }
}
