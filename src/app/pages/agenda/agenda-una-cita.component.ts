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
    movilidad: 'no',
    tipoMovilidad: '',
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

  sedesData: Record<string, string> = {
    'Magnolias': '51999151414',
    'Fátima': '51999151407',
    'Primavera': '51988361367',
    'San Andrés': '51927666325',
    'Huanchaco': '51999151425',
    'Larco': '51999151423',
    'Mansiche': '51999151421',
  };

  sedes = Object.keys(this.sedesData);

  submitted = signal(false);

  onSubmit(): void {
    if (!this.formData.sede) return;

    // 1. Get the phone number for the selected location
    const phoneNumber = this.sedesData[this.formData.sede];

    // 2. Build the WhatsApp message
    const message = `Hola ELDUKEDECAN (Sede ${this.formData.sede}), quiero agendar una cita.
    
*Detalles de la Cita:*
 *Nombre:* ${this.formData.nombre}
 *Mascota:* ${this.formData.mascota} (${this.formData.tipoMascota})
 *Servicio:* ${this.formData.servicio}
 *Fecha:* ${this.formData.fecha}
 *Hora Preferida:* ${this.formData.hora}
 *Mi Teléfono:* ${this.formData.telefono}
 *Movilidad:* ${this.formData.movilidad === 'si' ? 'Sí, ' + this.formData.tipoMovilidad : 'No requiere'}
${this.formData.mensaje ? `\n📝 *Mensaje:* ${this.formData.mensaje}` : ''}
    
¿Tienen disponibilidad en este horario?`;

    // 3. Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // 4. Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // 5. Show success message on the website
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
      movilidad: 'no',
      tipoMovilidad: '',
    };
    this.submitted.set(false);
  }
}
