import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

interface Servicio {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, SafeHtmlPipe],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})
export class ServiciosComponent {
  servicios: Servicio[] = [
    {
      title: 'Consulta Veterinaria',
      description:
        'Evaluación médica completa para tu mascota con diagnóstico profesional y plan de tratamiento personalizado.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>',
      features: ['Examen físico completo', 'Diagnóstico preciso', 'Plan de tratamiento'],
    },
    {
      title: 'Vacunación',
      description:
        'Programa de vacunación completo para cachorros y adultos. Protege a tu mascota con las vacunas esenciales.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>',
      features: ['Vacunas cachorros', 'Refuerzos anuales', 'Carnet de vacunación'],
    },
    {
      title: 'Cirugía',
      description:
        'Procedimientos quirúrgicos con equipo moderno y personal altamente capacitado. Cirugías de tejido blando y ortopédicas.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><rect width="20" height="14" x="2" y="8" rx="2"/><path d="M12 12v4"/><path d="M10 14h4"/></svg>',
      features: ['Esterilización', 'Cirugía ortopédica', 'Cirugía de tejido blando'],
    },
    {
      title: 'Grooming',
      description:
        'Servicio de baño y estética profesional. Tu mascota lucirá y se sentirá increíble después de cada sesión.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.68 3 4 3.68 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M10 5L5.6 9.4a2.83 2.83 0 0 0 0 4V14"/><path d="M14 5l4.4 4.4a2.83 2.83 0 0 1 0 4V14"/><path d="M18 22v-3"/><path d="M6 22v-3"/></svg>',
      features: ['Baño medicado', 'Corte a tijera', 'Limpieza de oídos'],
    },
    {
      title: 'Laboratorio Clínico',
      description:
        'Análisis de sangre, orina y otros exámenes clínicos con resultados rápidos y precisos para un diagnóstico certero.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>',
      features: ['Hemograma', 'Bioquímica', 'Urianálisis'],
    },
    {
      title: 'Desparasitación',
      description:
        'Tratamiento completo contra parásitos internos y externos. Protección integral para la salud de tu mascota.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
      features: ['Parásitos internos', 'Parásitos externos', 'Prevención continua'],
    },
    {
      title: 'Rayos X y Ecografía',
      description:
        'Diagnóstico por imágenes con equipos de última generación para identificar problemas internos con precisión.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
      features: ['Radiografía digital', 'Ecografía', 'Diagnóstico rápido'],
    },
    {
      title: 'Tienda de Mascotas',
      description:
        'Las mejores marcas de alimento, accesorios, juguetes y productos de higiene para perros y gatos.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-4.62 4.62c-.54.54-1.28.84-2.04.84H4v4h3.16c.76 0 1.5-.3 2.04-.84L17 10Z"/></svg>',
      features: ['Alimento premium', 'Accesorios', 'Juguetes y snacks'],
    },
  ];
}
