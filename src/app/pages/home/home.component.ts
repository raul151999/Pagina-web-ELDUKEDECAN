import { Component } from '@angular/core';
import { HeroComponent } from '../../layout/hero/hero.component';
import { BrandsComponent } from '../../layout/brands/brands.component';
import { TestimonialsComponent } from '../../layout/testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, BrandsComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
