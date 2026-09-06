import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reclamos-quejas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reclamos-quejas.component.html',
  styleUrl: './reclamos-quejas.component.css'
})
export class ReclamosQuejasComponent {
  form = {
    nombres: '',
    apellidos: '',
    dni: '',
    correo: '',
    celular: '',
    domicilio: '',
    referencia: '',
    tipo_bien: '',
    categoria: '',
    sede: '',
    colaborador: '',
    mascota: '',
    motivo: '',
    detalle: ''
  };

  isSubmitting = signal(false);
  isSuccess = signal(false);
  isError = signal(false);

  async onSubmit() {
    this.isSubmitting.set(true);
    this.isError.set(false);

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'reclamos');
      
      // Append all fields
      Object.entries(this.form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });

      if (response.ok) {
        this.isSuccess.set(true);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      this.isError.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
