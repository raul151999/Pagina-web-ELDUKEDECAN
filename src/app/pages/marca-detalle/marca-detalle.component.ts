import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Product {
  name: string;
  description: string;
  price: string;
  icon: string;
}

interface Marca {
  id: string;
  name: string;
  description: string;
  logo: string;
  products: Product[];
}

@Component({
  selector: 'app-marca-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './marca-detalle.component.html',
  styleUrl: './marca-detalle.component.css'
})
export class MarcaDetalleComponent implements OnInit {
  marcaId = '';
  marca = signal<Marca | null>(null);

  private marcasData: Record<string, Marca> = {
    'hills-pd': {
      id: 'hills-pd',
      name: "Hill's Prescription Diet",
      description: 'Nutrición clínica de vanguardia para tratar diversas condiciones de salud en mascotas.',
      logo: 'assets/logos/hills-logo.png',
      products: [
        { name: "Hill's PD c/d Multicare", description: 'Cuidado urinario comprobado.', price: 'S/ 150.00', icon: '🐈' },
        { name: "Hill's PD i/d Digestive", description: 'Cuidado digestivo para perros.', price: 'S/ 180.00', icon: '🐕' }
      ]
    },
    'hills-sd': {
      id: 'hills-sd',
      name: "Hill's Science Diet",
      description: 'Nutrición basada en la biología para anticiparse a las cambiantes necesidades de tu mascota.',
      logo: 'assets/logos/hills-logo.png',
      products: [
        { name: "Hill's SD Adult Small Paws", description: 'Alimento seco para perros adultos.', price: 'S/ 120.00', icon: '🐕' }
      ]
    },
    'nutram': {
      id: 'nutram',
      name: "Nutram",
      description: 'Recetas holísticas y naturales que optimizan la salud desde adentro hacia afuera.',
      logo: 'assets/logos/nutram-logo.png',
      products: [
        { name: 'Nutram Sound Balanced Wellness', description: 'Para perros adultos.', price: 'S/ 130.00', icon: '🐕' }
      ]
    },
    'proplan': {
      id: 'proplan',
      name: "Purina Pro Plan",
      description: 'Nutrición de vanguardia para perros y gatos, con carne fresca como primer ingrediente.',
      logo: 'assets/logos/pro-plan-logo.png',
      products: [
        { name: 'Pro Plan Adult Complete', description: 'Con OptiHealth para salud diaria.', price: 'S/ 180.00', icon: '🐕' },
        { name: 'Pro Plan Kitten OptiStart', description: 'Protección durante su primer año.', price: 'S/ 65.00', icon: '🐈' }
      ]
    },
    'brit-care': {
      id: 'brit-care',
      name: "Brit Care",
      description: 'Alimento súper premium hipoalergénico diseñado para proteger el organismo frente a influencias negativas.',
      logo: 'assets/logos/brit-care-logo.png',
      products: [
        { name: 'Brit Care Adult Medium Breed', description: 'Para perros de razas medianas.', price: 'S/ 160.00', icon: '🐕' }
      ]
    },
    'monge': {
      id: 'monge',
      name: "Monge",
      description: 'Recetas naturales super premium desde Italia para todas las necesidades nutricionales.',
      logo: 'assets/logos/monge-logo.png',
      products: [
        { name: 'Monge Natural Superpremium', description: 'Alimento completo.', price: 'S/ 140.00', icon: '🐕' }
      ]
    },
    'brit-premium': {
      id: 'brit-premium',
      name: "Brit Premium",
      description: 'Alta digestibilidad y palatabilidad con excelentes fuentes de proteínas.',
      logo: 'assets/logos/brit-premium-logo.png',
      products: [
        { name: 'Brit Premium by Nature', description: 'Fórmula completa y equilibrada.', price: 'S/ 110.00', icon: '🐕' }
      ]
    },
    'canbo': {
      id: 'canbo',
      name: "Canbo",
      description: 'Alimento súper premium desarrollado con tecnología Bioactive para una nutrición superior.',
      logo: 'assets/logos/canbo-logo.png',
      products: [
        { name: 'Canbo Adulto Cordero', description: 'Fórmula con cordero y arroz.', price: 'S/ 145.00', icon: '🐕' }
      ]
    },
    'ricocan': {
      id: 'ricocan',
      name: "Ricocan",
      description: 'Alimento completo y balanceado con la energía que tu mascota necesita.',
      logo: 'assets/logos/ricocan-logo.png',
      products: [
        { name: 'Ricocan Multicereal', description: 'Para perros adultos de toda raza.', price: 'S/ 85.00', icon: '🐕' }
      ]
    },
    'formula-natural': {
      id: 'formula-natural',
      name: "Fórmula Natural",
      description: 'Nutrición avanzada sin conservantes artificiales para el bienestar óptimo de tu mascota.',
      logo: 'assets/logos/formula-natural-logo.png',
      products: [
        { name: 'Fórmula Natural Fresh Meat', description: 'Con carne fresca de pollo.', price: 'S/ 170.00', icon: '🐕' }
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.marcaId = params.get('id') || '';
      
      if (this.marcasData[this.marcaId]) {
        this.marca.set(this.marcasData[this.marcaId]);
      } else {
        this.marca.set(null); 
      }
    });
  }
}
