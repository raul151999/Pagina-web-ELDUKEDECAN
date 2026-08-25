import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
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
export class HeroComponent implements OnInit, OnDestroy {


  currentSlide = signal(0);
  viewers = signal(0);

  slides: Slide[] = [
    { imageUrl: 'assets/images/carrousel/spa.png', alt: 'Spa Canino' },
    { imageUrl: 'assets/images/carrousel/petshop.png', alt: 'Pet Shop' },
    { imageUrl: 'assets/images/carrousel/clinica.png', alt: 'Clínica Veterinaria' },
    { imageUrl: 'assets/images/carrousel/guarderia.png', alt: 'Guardería' },
    { imageUrl: 'assets/images/carrousel/party.png', alt: 'Pet Party' }
  ];

  private slideInterval: ReturnType<typeof setInterval> | null = null;
  private viewerInterval: ReturnType<typeof setInterval> | null = null;

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

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.viewerInterval) {
      clearInterval(this.viewerInterval);
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
