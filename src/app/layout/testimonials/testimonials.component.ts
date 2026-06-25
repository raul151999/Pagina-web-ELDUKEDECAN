import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Alexis Carrión',
      pet: 'Tita',
      rating: 5,
      text: 'Llevo meses llevando a mi perrita a ELDUKEDECAN y siempre me brindan una atención profesional y llena de cariño.',
      avatar: '🧑',
    },
    {
      name: 'Mateo Gonzales',
      pet: 'Mylo',
      rating: 5,
      text: 'Como cliente de ELDUKEDECAN, puedo decir que confío totalmente en su profesionalismo y cariño por los animales. Cada visita refuerza mi confianza.',
      avatar: '👨',
    },
    {
      name: 'Rodrigo Alfaro',
      pet: 'Teddy',
      rating: 5,
      text: 'Siempre tengo confianza en ELDUKEDECAN para cuidar a mi mascota, desde chequeos rutinarios hasta emergencias. El equipo se dedica plenamente a su bienestar.',
      avatar: '🧔',
    },
  ];

  // New testimonial form state
  newRating: number = 5;
  newName: string = '';
  newPet: string = '';
  newText: string = '';
  showForm: boolean = false;

  setRating(rating: number) {
    this.newRating = rating;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addTestimonial(event: Event) {
    event.preventDefault();
    if (!this.newName || !this.newText) return;

    this.testimonials.unshift({
      name: this.newName,
      pet: this.newPet || 'Mi mascota',
      rating: this.newRating,
      text: this.newText,
      avatar: '🧑', // default avatar
    });

    // Reset form
    this.newName = '';
    this.newPet = '';
    this.newText = '';
    this.newRating = 5;
    this.showForm = false;
  }
}
