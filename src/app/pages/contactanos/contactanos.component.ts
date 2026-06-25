import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Sede {
  name: string;
  address: string;
  phone: string;
  hours: string;
}

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css',
})
export class ContactanosComponent {
  sedes: Sede[] = [
    {
      name: 'Magnolias',
      address: 'Av. Las Magnolias, Trujillo',
      phone: '(044) 123-456',
      hours: 'Lun-Sáb: 9AM-8PM',
    },
    {
      name: 'Fátima',
      address: 'Urb. Fátima, Trujillo',
      phone: '(044) 234-567',
      hours: 'Lun-Sáb: 9AM-8PM',
    },
    {
      name: 'Primavera',
      address: 'Urb. Primavera, Trujillo',
      phone: '(044) 345-678',
      hours: 'Lun-Sáb: 9AM-8PM',
    },
    {
      name: 'San Andrés',
      address: 'Urb. San Andrés, Trujillo',
      phone: '(044) 456-789',
      hours: 'Lun-Sáb: 9AM-8PM',
    },
    {
      name: 'Huanchaco',
      address: 'Huanchaco, Trujillo',
      phone: '(044) 567-890',
      hours: 'Lun-Sáb: 9AM-7PM',
    },
    {
      name: 'Larco',
      address: 'Av. Larco, Trujillo',
      phone: '(044) 678-901',
      hours: 'Lun-Sáb: 9AM-8PM',
    },
    {
      name: 'Mansiche',
      address: 'Av. Mansiche, Trujillo',
      phone: '(044) 789-012',
      hours: 'Lun-Sáb: 9AM-8PM',
    },
  ];

  contactForm = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  };

  messageSent = signal(false);

  onSubmit(): void {
    this.messageSent.set(true);
  }

  resetForm(): void {
    this.contactForm = { nombre: '', email: '', asunto: '', mensaje: '' };
    this.messageSent.set(false);
  }
}
