import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

interface Slide {
  imageUrl: string;
  alt: string;
}

interface SearchItem {
  title: string;
  category: string;
  route: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SafeHtmlPipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  // Search state
  searchQuery = signal('');
  showSuggestions = signal(false);

  // Searchable database
  searchDatabase: SearchItem[] = [
    { title: 'Consulta veterinaria', category: 'Servicios', route: '/servicios' },
    { title: 'Vacunación', category: 'Servicios', route: '/servicios' },
    { title: 'Cirugía', category: 'Servicios', route: '/servicios' },
    { title: 'Grooming', category: 'Servicios', route: '/servicios' },
    { title: 'Desparasitación', category: 'Servicios', route: '/servicios' },
    { title: 'Laboratorio clínico', category: 'Servicios', route: '/servicios' },
    { title: 'Rayos X / Ecografía', category: 'Servicios', route: '/servicios' },
    { title: 'Descuentos del mes', category: 'Ofertas', route: '/ofertas' },
    { title: 'Combos Preventivos', category: 'Ofertas', route: '/ofertas' },
    { title: 'Packs de Grooming', category: 'Ofertas', route: '/ofertas' },
    { title: "Hill's", category: 'Marcas', route: '/' },
    { title: 'Pro Plan', category: 'Marcas', route: '/' },
    { title: 'Royal Canin', category: 'Marcas', route: '/' },
    { title: 'Bravecto', category: 'Marcas', route: '/' }
  ];

  // Computed filtered results
  filteredSuggestions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.searchDatabase.slice(0, 5); // Show first 5 as defaults
    return this.searchDatabase.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    );
  });

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

  // Search Methods
  onSearchInput() {
    this.showSuggestions.set(true);
  }

  hideSuggestions() {
    setTimeout(() => this.showSuggestions.set(false), 200);
  }

  selectSuggestion(item: SearchItem) {
    this.searchQuery.set(item.title);
    this.showSuggestions.set(false);
    this.router.navigate([item.route]);
  }

  performSearch() {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return;

    const match = this.searchDatabase.find(item => item.title.toLowerCase().includes(query));
    if (match) {
      this.router.navigate([match.route]);
    } else {
      this.router.navigate(['/servicios']);
    }
  }

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
