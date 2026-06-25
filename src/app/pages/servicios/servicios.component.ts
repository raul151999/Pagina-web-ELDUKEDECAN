import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Servicio {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})
export class ServiciosComponent {
  servicios: Servicio[] = [
    {
      title: 'Consulta Veterinaria',
      description:
        'Evaluación médica completa para tu mascota con diagnóstico profesional y plan de tratamiento personalizado.',
      icon: '🩺',
      features: ['Examen físico completo', 'Diagnóstico preciso', 'Plan de tratamiento'],
    },
    {
      title: 'Vacunación',
      description:
        'Programa de vacunación completo para cachorros y adultos. Protege a tu mascota con las vacunas esenciales.',
      icon: '💉',
      features: ['Vacunas cachorros', 'Refuerzos anuales', 'Carnet de vacunación'],
    },
    {
      title: 'Cirugía',
      description:
        'Procedimientos quirúrgicos con equipo moderno y personal altamente capacitado. Cirugías de tejido blando y ortopédicas.',
      icon: '🏥',
      features: ['Esterilización', 'Cirugía ortopédica', 'Cirugía de tejido blando'],
    },
    {
      title: 'Grooming',
      description:
        'Servicio de baño y estética profesional. Tu mascota lucirá y se sentirá increíble después de cada sesión.',
      icon: '🛁',
      features: ['Baño medicado', 'Corte a tijera', 'Limpieza de oídos'],
    },
    {
      title: 'Laboratorio Clínico',
      description:
        'Análisis de sangre, orina y otros exámenes clínicos con resultados rápidos y precisos para un diagnóstico certero.',
      icon: '🔬',
      features: ['Hemograma', 'Bioquímica', 'Urianálisis'],
    },
    {
      title: 'Desparasitación',
      description:
        'Tratamiento completo contra parásitos internos y externos. Protección integral para la salud de tu mascota.',
      icon: '🛡️',
      features: ['Parásitos internos', 'Parásitos externos', 'Prevención continua'],
    },
    {
      title: 'Rayos X y Ecografía',
      description:
        'Diagnóstico por imágenes con equipos de última generación para identificar problemas internos con precisión.',
      icon: '📷',
      features: ['Radiografía digital', 'Ecografía', 'Diagnóstico rápido'],
    },
    {
      title: 'Tienda de Mascotas',
      description:
        'Las mejores marcas de alimento, accesorios, juguetes y productos de higiene para perros y gatos.',
      icon: '🦴',
      features: ['Alimento premium', 'Accesorios', 'Juguetes y snacks'],
    },
  ];
}
