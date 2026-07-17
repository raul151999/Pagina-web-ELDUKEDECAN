import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

interface Servicio {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  imagePath: string; // We'll just use a placeholder gradient or emoji if no image
}

@Component({
  selector: 'app-servicio-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeHtmlPipe],
  templateUrl: './servicio-detalle.component.html',
  styleUrl: './servicio-detalle.component.css'
})
export class ServicioDetalleComponent implements OnInit {
  servicioId = '';
  servicio = signal<Servicio | null>(null);

  // Hardcoded mock data matching the services dropdown
  private serviciosData: Record<string, Servicio> = {
    'consulta-veterinaria': {
      id: 'consulta-veterinaria',
      title: 'Consulta Veterinaria',
      description: 'Atención médica integral preventiva y curativa para evaluar la salud general de tu mascota. Incluye revisión física completa, diagnóstico y plan de tratamiento.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>',
      features: ['Evaluación física completa', 'Diagnóstico general', 'Receta médica digital', 'Seguimiento personalizado'],
      imagePath: 'linear-gradient(135deg, #004a59 0%, #0f766e 100%)'
    },
    'vacunacion': {
      id: 'vacunacion',
      title: 'Vacunación',
      description: 'Esquema completo de vacunación para proteger a tu mascota contra las principales enfermedades infecciosas, asegurando una vida larga y saludable.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>',
      features: ['Vacunas múltiple y rabia', 'Vacunas para cachorros', 'Carnet de vacunación', 'Recordatorios automáticos'],
      imagePath: 'linear-gradient(135deg, #0f766e 0%, #02c7b0 100%)'
    },
    'cirugia': {
      id: 'cirugia',
      title: 'Cirugía',
      description: 'Intervenciones quirúrgicas seguras con monitoreo anestésico avanzado. Realizamos esterilizaciones, cirugías de tejidos blandos y traumatología básica.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><rect width="20" height="14" x="2" y="8" rx="2"/><path d="M12 12v4"/><path d="M10 14h4"/></svg>',
      features: ['Esterilización / Castración', 'Limpieza dental con anestesia', 'Monitoreo multiparámetro', 'Cuidado post-operatorio'],
      imagePath: 'linear-gradient(135deg, #004a59 0%, #02c7b0 100%)'
    },
    'grooming': {
      id: 'grooming',
      title: 'Grooming y Spa',
      description: 'Baños medicados, cortes de raza, limpieza de oídos y corte de uñas para que tu mascota luzca y se sienta espectacular.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.68 3 4 3.68 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M10 5L5.6 9.4a2.83 2.83 0 0 0 0 4V14"/><path d="M14 5l4.4 4.4a2.83 2.83 0 0 1 0 4V14"/><path d="M18 22v-3"/><path d="M6 22v-3"/></svg>',
      features: ['Baño estético y medicado', 'Corte de raza y tijera', 'Limpieza de glándulas', 'Aromaterapia pet-friendly'],
      imagePath: 'linear-gradient(135deg, #02c7b0 0%, #b6fe3d 100%)'
    },
    'desparasitacion': {
      id: 'desparasitacion',
      title: 'Desparasitación',
      description: 'Control y prevención de parásitos internos y externos (pulgas, garrapatas) usando los mejores productos del mercado.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
      features: ['Desparasitación interna', 'Control de pulgas y garrapatas', 'Asesoría preventiva', 'Dosis exacta por peso'],
      imagePath: 'linear-gradient(135deg, #004a59 0%, #0f766e 100%)'
    },
    'laboratorio-clinico': {
      id: 'laboratorio-clinico',
      title: 'Laboratorio Clínico',
      description: 'Análisis de sangre, orina y heces con resultados rápidos y precisos para un diagnóstico certero del estado de tu mascota.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>',
      features: ['Hemograma completo', 'Perfil bioquímico', 'Análisis de heces y orina', 'Resultados en 30 minutos'],
      imagePath: 'linear-gradient(135deg, #02c7b0 0%, #b6fe3d 100%)'
    },
    'rayosx-ecografia': {
      id: 'rayosx-ecografia',
      title: 'Rayos X y Ecografía',
      description: 'Imágenes diagnósticas de alta resolución para evaluar órganos internos, huesos y gestación de manera rápida y no invasiva.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
      features: ['Radiología digital', 'Ecografía abdominal', 'Diagnóstico de gestación', 'Entrega digital de imágenes'],
      imagePath: 'linear-gradient(135deg, #0f766e 0%, #004a59 100%)'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Escuchar cambios en los parámetros de la URL para actualizar la vista dinámicamente
    this.route.paramMap.subscribe(params => {
      this.servicioId = params.get('id') || '';
      
      if (this.serviciosData[this.servicioId]) {
        this.servicio.set(this.serviciosData[this.servicioId]);
      } else {
        // En caso de que no exista el ID, mostrar algo genérico o redireccionar
        this.servicio.set(null); 
      }
    });
  }
}
