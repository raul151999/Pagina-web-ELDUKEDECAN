import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Sede {
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl: string;
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
      address: 'Calle Las Magnolias 586, Trujillo',
      phone: '999151414',
      hours: 'Lun-Sáb: 8AM-10PM',
      mapUrl: 'https://www.google.com/maps?q=Calle+Las+Magnolias+586,+Trujillo,+Peru&output=embed',
    },
    {
      name: 'Fátima',
      address: 'Av. Fátima 630, Trujillo',
      phone: '999151407',
      hours: 'Lun-Sáb: 8AM-10PM',
      mapUrl: 'https://www.google.com/maps?q=Av.+Fatima+630,+Trujillo,+Peru&output=embed',
    },
    {
      name: 'Primavera',
      address: 'Av Manuel Vera Enriquez 630, Trujillo',
      phone: '988361367',
      hours: 'Lun-Sáb: 9AM-9PM',
      mapUrl: 'https://www.google.com/maps?q=Av+Manuel+Vera+Enriquez+630,+Trujillo,+Peru&output=embed',
    },
    {
      name: 'San Andrés',
      address: 'Av. America Sur 4214, Trujillo',
      phone: '927666325',
      hours: 'Lun-Sáb: 9AM-10PM',
      mapUrl: 'https://www.google.com/maps?q=Av.+America+Sur+4214,+Trujillo,+Peru&output=embed',
    },
    {
      name: 'Huanchaco',
      address: 'Av. Union 623, Huanchaco',
      phone: '999151425',
      hours: 'Lun-Sáb: 9:30AM-6:30PM',
      mapUrl: 'https://www.google.com/maps?q=Av.+Union+623,+Huanchaco,+Peru&output=embed',
    },
    {
      name: 'Larco',
      address: 'Av. Larco 1276, Trujillo',
      phone: '999151423',
      hours: 'Lun-Sáb: 9AM-9PM',
      mapUrl: 'https://www.google.com/maps?q=Av.+Larco+1276,+Trujillo,+Peru&output=embed',
    },
    {
      name: 'Mansiche',
      address: 'Av. Estambul 469, Trujillo',
      phone: '999151421',
      hours: 'Lun-Sáb: 9AM-9PM',
      mapUrl: 'https://www.google.com/maps?q=Av.+Estambul+469,+Trujillo,+Peru&output=embed',
    }
  ];

  activeSede = signal<Sede>(this.sedes[0]);
  safeMapUrl = signal<SafeResourceUrl | null>(null);

  constructor(private sanitizer: DomSanitizer) {
    this.updateMapUrl(this.activeSede());
  }

  selectSede(sede: Sede) {
    this.activeSede.set(sede);
    this.updateMapUrl(sede);
  }

  private updateMapUrl(sede: Sede) {
    this.safeMapUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(sede.mapUrl));
  }

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
