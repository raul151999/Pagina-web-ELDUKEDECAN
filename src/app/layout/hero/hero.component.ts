import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

interface Slide {
  title: string;
  subtitle: string;
  gradient: string;
  icon: string;
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
    {
      title: 'Cuidamos a tu mascota con amor',
      subtitle: 'Más de 20 años de experiencia en Trujillo',
      gradient: 'linear-gradient(135deg, #004a59 0%, #0f766e 100%)',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    },
    {
      title: 'Las mejores marcas de alimento',
      subtitle: 'Nutrición premium para perros y gatos',
      gradient: 'linear-gradient(135deg, #0f766e 0%, #02c7b0 100%)',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-4.62 4.62c-.54.54-1.28.84-2.04.84H4v4h3.16c.76 0 1.5-.3 2.04-.84L17 10Z"/></svg>',
    },
    {
      title: 'Agenda tu cita hoy',
      subtitle: '7 sedes en Trujillo para atenderte',
      gradient: 'linear-gradient(135deg, #02c7b0 0%, #b6fe3d 100%)',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h8"/><path d="M12 18v-8"/></svg>',
    },
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
