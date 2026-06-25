import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Oferta {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  imagePath: string;
}

@Component({
  selector: 'app-oferta-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './oferta-detalle.component.html',
  styleUrl: './oferta-detalle.component.css'
})
export class OfertaDetalleComponent implements OnInit {
  ofertaId = '';
  oferta = signal<Oferta | null>(null);

  private ofertasData: Record<string, Oferta> = {
    'descuentos': {
      id: 'descuentos',
      title: 'Descuentos del Mes',
      description: 'Aprovecha nuestras promociones mensuales en alimentos seleccionados, accesorios y juguetes para tu engreído.',
      icon: '🔥',
      features: ['Hasta 30% en alimentos premium', '2x1 en juguetes interactivos', 'Descuento especial en accesorios de paseo', 'Válido en todas nuestras 7 sedes'],
      imagePath: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
    },
    'combos': {
      id: 'combos',
      title: 'Combos Preventivos',
      description: 'Protege a tu mascota con nuestros combos de salud que incluyen desparasitación, vacunación y chequeo general a un precio especial.',
      icon: '🛡️',
      features: ['Consulta general + Desparasitación interna', 'Vacuna anual (Múltiple/Rabia)', 'Revisión dental básica', 'Ahorro de hasta 25%'],
      imagePath: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    'packs': {
      id: 'packs',
      title: 'Packs de Grooming',
      description: 'Dale a tu mascota un día de spa con nuestros packs de grooming completos. Baño, corte, limpieza de orejas y más.',
      icon: '✨',
      features: ['Baño medicado o estético', 'Corte de uñas y limpieza de oídos', 'Perfume pet-friendly', 'Pañuelo o lazo de regalo'],
      imagePath: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ofertaId = params.get('id') || '';
      
      if (this.ofertasData[this.ofertaId]) {
        this.oferta.set(this.ofertasData[this.ofertaId]);
      } else {
        this.oferta.set(null); 
      }
    });
  }
}
