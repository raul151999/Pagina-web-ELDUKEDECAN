import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  imports: [CommonModule, RouterLink],
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
      icon: '🩺',
      features: ['Evaluación física completa', 'Diagnóstico general', 'Receta médica digital', 'Seguimiento personalizado'],
      imagePath: 'linear-gradient(135deg, #004a59 0%, #0f766e 100%)'
    },
    'vacunacion': {
      id: 'vacunacion',
      title: 'Vacunación',
      description: 'Esquema completo de vacunación para proteger a tu mascota contra las principales enfermedades infecciosas, asegurando una vida larga y saludable.',
      icon: '💉',
      features: ['Vacunas múltiple y rabia', 'Vacunas para cachorros', 'Carnet de vacunación', 'Recordatorios automáticos'],
      imagePath: 'linear-gradient(135deg, #0f766e 0%, #02c7b0 100%)'
    },
    'cirugia': {
      id: 'cirugia',
      title: 'Cirugía',
      description: 'Intervenciones quirúrgicas seguras con monitoreo anestésico avanzado. Realizamos esterilizaciones, cirugías de tejidos blandos y traumatología básica.',
      icon: '🏥',
      features: ['Esterilización / Castración', 'Limpieza dental con anestesia', 'Monitoreo multiparámetro', 'Cuidado post-operatorio'],
      imagePath: 'linear-gradient(135deg, #004a59 0%, #02c7b0 100%)'
    },
    'grooming': {
      id: 'grooming',
      title: 'Grooming y Spa',
      description: 'Baños medicados, cortes de raza, limpieza de oídos y corte de uñas para que tu mascota luzca y se sienta espectacular.',
      icon: '🛁',
      features: ['Baño estético y medicado', 'Corte de raza y tijera', 'Limpieza de glándulas', 'Aromaterapia pet-friendly'],
      imagePath: 'linear-gradient(135deg, #02c7b0 0%, #b6fe3d 100%)'
    },
    'desparasitacion': {
      id: 'desparasitacion',
      title: 'Desparasitación',
      description: 'Control y prevención de parásitos internos y externos (pulgas, garrapatas) usando los mejores productos del mercado.',
      icon: '💊',
      features: ['Desparasitación interna', 'Control de pulgas y garrapatas', 'Asesoría preventiva', 'Dosis exacta por peso'],
      imagePath: 'linear-gradient(135deg, #14b8a6 0%, #8bd42a 100%)'
    },
    'laboratorio-clinico': {
      id: 'laboratorio-clinico',
      title: 'Laboratorio Clínico',
      description: 'Análisis de sangre, orina y heces con resultados rápidos y precisos para un diagnóstico certero del estado de tu mascota.',
      icon: '🔬',
      features: ['Hemograma completo', 'Perfil bioquímico', 'Análisis de heces y orina', 'Resultados en 30 minutos'],
      imagePath: 'linear-gradient(135deg, #00333e 0%, #004a59 100%)'
    },
    'rayosx-ecografia': {
      id: 'rayosx-ecografia',
      title: 'Rayos X y Ecografía',
      description: 'Imágenes diagnósticas de alta resolución para evaluar órganos internos, huesos y gestación de manera rápida y no invasiva.',
      icon: '📷',
      features: ['Radiología digital', 'Ecografía abdominal', 'Diagnóstico de gestación', 'Entrega digital de imágenes'],
      imagePath: 'linear-gradient(135deg, #0f766e 0%, #10b981 100%)'
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
