import { Component } from '@angular/core';
import { HeroComponent } from '../../layout/hero/hero.component';
import { BrandsComponent } from '../../layout/brands/brands.component';
import { TestimonialsComponent } from '../../layout/testimonials/testimonials.component';
import { VideoCarouselComponent } from '../../components/video-carousel/video-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, BrandsComponent, TestimonialsComponent, VideoCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
