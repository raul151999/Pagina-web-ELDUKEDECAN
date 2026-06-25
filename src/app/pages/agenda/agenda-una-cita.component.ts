import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agenda-una-cita',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agenda-una-cita.component.html',
  styleUrl: './agenda-una-cita.component.css',
})
export class AgendaUnaCitaComponent {
  formData = {
    nombre: '',
    telefono: '',
    email: '',
    mascota: '',
    tipoMascota: '',
    servicio: '',
    sede: '',
    fecha: '',
    hora: '',
    mensaje: '',
  };

  servicios = [
    'Consulta veterinaria',
    'Vacunación',
    'Cirugía',
    'Grooming',
    'Desparasitación',
    'Laboratorio clínico',
    'Rayos X / Ecografía',
    'Otro',
  ];

  sedes = [
    'Magnolias',
    'Fátima',
    'Primavera',
    'San Andrés',
    'Huanchaco',
    'Larco',
    'Mansiche',
  ];

  submitted = signal(false);

  onSubmit(): void {
    this.submitted.set(true);
  }

  resetForm(): void {
    this.formData = {
      nombre: '',
      telefono: '',
      email: '',
      mascota: '',
      tipoMascota: '',
      servicio: '',
      sede: '',
      fecha: '',
      hora: '',
      mensaje: '',
    };
    this.submitted.set(false);
  }
}
