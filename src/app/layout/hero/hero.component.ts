import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  // Search state
  searchQuery = signal('');
  showSuggestions = signal(false);

  // Searchable database
  searchDatabase: SearchItem[] = [
    { title: 'Consulta veterinaria', category: 'Servicios', route: '/servicios/consulta-veterinaria' },
    { title: 'Vacunación', category: 'Servicios', route: '/servicios/vacunacion' },
    { title: 'Cirugía', category: 'Servicios', route: '/servicios/cirugia' },
    { title: 'Grooming', category: 'Servicios', route: '/servicios/grooming' },
    { title: 'Desparasitación', category: 'Servicios', route: '/servicios/desparasitacion' },
    { title: 'Laboratorio clínico', category: 'Servicios', route: '/servicios/laboratorio-clinico' },
    { title: 'Rayos X / Ecografía', category: 'Servicios', route: '/servicios/rayosx-ecografia' },
    { title: 'Descuentos del mes', category: 'Ofertas', route: '/ofertas/descuentos' },
    { title: 'Combos Preventivos', category: 'Ofertas', route: '/ofertas/combos' },
    { title: 'Packs de Grooming', category: 'Ofertas', route: '/ofertas/packs' },
    { title: "Hill's", category: 'Marcas', route: '/marcas/hills' },
    { title: 'Pro Plan', category: 'Marcas', route: '/marcas/pro-plan' },
    { title: 'Royal Canin', category: 'Marcas', route: '/marcas/royal-canin' },
    { title: 'Bravecto', category: 'Marcas', route: '/marcas/bravecto' }
  ];

  // Computed filtered results
  filteredSuggestions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return [];
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
      icon: '🐕',
    },
    {
      title: 'Las mejores marcas de alimento',
      subtitle: 'Nutrición premium para perros y gatos',
      gradient: 'linear-gradient(135deg, #0f766e 0%, #02c7b0 100%)',
      icon: '🐈',
    },
    {
      title: 'Agenda tu cita hoy',
      subtitle: '7 sedes en Trujillo para atenderte',
      gradient: 'linear-gradient(135deg, #02c7b0 0%, #b6fe3d 100%)',
      icon: '🏥',
    },
  ];

  private slideInterval: ReturnType<typeof setInterval> | null = null;
  private viewerInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private router: Router) {}

  // Search Methods
  onSearchInput() {
    this.showSuggestions.set(this.searchQuery().trim().length > 0);
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
