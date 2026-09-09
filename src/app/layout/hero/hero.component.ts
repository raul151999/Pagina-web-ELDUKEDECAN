import { Component, OnDestroy, OnInit, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

interface Slide {
  imageUrl: string;
  alt: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SafeHtmlPipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('statsSection') statsSection!: ElementRef;

  currentSlide = signal(0);
  viewers = signal(0);

  // Counters for stats section
  expYears = signal(0);
  branches = signal(0);
  partners = signal(0);

  slides: Slide[] = [
    { imageUrl: 'assets/images/carrousel/spa.png', alt: 'Spa Canino' },
    { imageUrl: 'assets/images/carrousel/petshop.png', alt: 'Pet Shop' },
    { imageUrl: 'assets/images/carrousel/clinica.png', alt: 'Clínica Veterinaria' },
    { imageUrl: 'assets/images/carrousel/guarderia.png', alt: 'Guardería' },
    { imageUrl: 'assets/images/carrousel/party.png', alt: 'Pet Party' }
  ];

  private slideInterval: ReturnType<typeof setInterval> | null = null;
  private viewerInterval: ReturnType<typeof setInterval> | null = null;
  private observer: IntersectionObserver | null = null;
  private hasCounted = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Auto-advance carousel every 5 seconds
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);

    // Animated viewer counter
    const target = Math.floor(Math.random() * (99 - 20 + 1)) + 20;
    this.viewerInterval = setInterval(() => {
      const current = this.viewers();
      if (current < target) {
        this.viewers.set(current + 1);
      } else {
        if (this.viewerInterval) {
          clearInterval(this.viewerInterval);
          this.viewerInterval = null;
        }
      }
    }, 30);
  }

  ngAfterViewInit(): void {
    // Set up intersection observer for stats
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.hasCounted) {
        this.hasCounted = true;
        this.startCounting();
      }
    }, { threshold: 0.3 });
    
    if (this.statsSection) {
      this.observer.observe(this.statsSection.nativeElement);
    }
  }

  startCounting() {
    this.animateValue(this.expYears, 20, 2000);
    this.animateValue(this.branches, 7, 2000);
    this.animateValue(this.partners, 10, 2000);
  }

  animateValue(signalRef: any, end: number, duration: number) {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quart function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); 
      signalRef.set(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        signalRef.set(end);
      }
    };
    window.requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.viewerInterval) {
      clearInterval(this.viewerInterval);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  nextSlide(): void {
    this.currentSlide.set((this.currentSlide() + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.currentSlide.set(
      (this.currentSlide() - 1 + this.slides.length) % this.slides.length
    );
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }
}
