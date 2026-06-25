import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Promo {
  title: string;
  description: string;
  discount: string;
  icon: string;
  tag: string;
  color: string;
}

@Component({
  selector: 'app-promos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.css',
})
export class PromosComponent {
  promos: Promo[] = [
    {
      title: 'Baño + Corte Premium',
      description:
        'Servicio completo de grooming para tu mascota. Incluye baño medicado, corte a tijera, limpieza de oídos y corte de uñas.',
      discount: '-20%',
      icon: '🛁',
      tag: 'Grooming',
      color: '#0f766e',
    },
    {
      title: 'Consulta Veterinaria',
      description:
        'Primera consulta con evaluación completa, peso, temperatura y recomendaciones personalizadas para tu mascota.',
      discount: 'Gratis',
      icon: '🩺',
      tag: 'Consulta',
      color: '#004a59',
    },
    {
      title: 'Pack Vacunación Cachorro',
      description:
        'Plan completo de vacunación para cachorros. Incluye triple, séxtuple y antirrábica con carnet de vacunación.',
      discount: '-30%',
      icon: '💉',
      tag: 'Vacunas',
      color: '#7c3aed',
    },
    {
      title: 'Desparasitación Completa',
      description:
        'Desparasitación interna y externa para perros y gatos. Protege a tu mascota de parásitos durante 3 meses.',
      discount: '-15%',
      icon: '🛡️',
      tag: 'Salud',
      color: '#dc2626',
    },
    {
      title: 'Alimento Premium — 2x1',
      description:
        'Lleva 2 bolsas de alimento premium al precio de 1. Válido para marcas seleccionadas: Hill\'s, Pro Plan y Brit Care.',
      discount: '2x1',
      icon: '🦴',
      tag: 'Alimento',
      color: '#ea580c',
    },
    {
      title: 'Limpieza Dental',
      description:
        'Profilaxis dental completa con ultrasonido. Previene enfermedades periodontales y mantiene la salud bucal de tu mascota.',
      discount: '-25%',
      icon: '🦷',
      tag: 'Dental',
      color: '#0284c7',
    },
  ];
}
