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
    raza: '',
    edad: '',
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

    // Número de Marketing central
    const marketingPhone = '51946959338';
    
    // Obtener el número de ticket secuencial de localStorage o empezar en 10065
    let currentTicket = parseInt(localStorage.getItem('eldukedecan_ticket_counter') || '10065', 10);
    const ticketId = currentTicket;
    
    // Incrementar y guardar para la próxima vez
    localStorage.setItem('eldukedecan_ticket_counter', (currentTicket + 1).toString());

    // Formatear el mensaje según lo solicitado
    const message = `Agenda tu cita
Respuesta #${ticketId}
Motivo : ${this.formData.servicio}
Nombre : ${this.formData.nombre}
WhatsApp : ${this.formData.telefono}
Día : ${this.formData.fecha}
Horario : ${this.formData.hora}
Sede : ${this.formData.sede}
Nombre de tu mascota, raza y edad : ${this.formData.mascota}, ${this.formData.raza}, ${this.formData.edad}`;

    // Codificar y abrir WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${marketingPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    this.submitted.set(true);
  }

  resetForm(): void {
    this.formData = {
      nombre: '',
      telefono: '',
      email: '',
      mascota: '',
      tipoMascota: '',
      raza: '',
      edad: '',
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
