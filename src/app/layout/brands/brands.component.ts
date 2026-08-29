import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  brands = [
    { name: "Hill's", img: 'assets/logos/hills-logo.png', id: 'hills-sd' },
    { name: 'Pro Plan', img: 'assets/logos/pro-plan-logo.png', id: 'proplan' },
    { name: 'Nutram', img: 'assets/logos/nutram-logo.png', id: 'nutram' },
    { name: 'Brit Care', img: 'assets/logos/brit-care-logo.png', id: 'brit-care' },
    { name: 'Monge', img: 'assets/logos/monge-logo.png', id: 'monge' },
    { name: 'Brit Premium', img: 'assets/logos/brit-premium-logo.png', id: 'brit-premium' },
    { name: 'Canbo', img: 'assets/logos/canbo-logo.png', id: 'canbo' },
    { name: 'Ricocan', img: 'assets/logos/ricocan-logo.png', id: 'ricocan' },
    { name: 'Orijen', img: 'assets/logos/orijen-logo.jpg', id: 'orijen' },
    { name: "Dr. Clauder's", img: 'assets/logos/dr-clauders-logo.jpg', id: 'dr-clauders' },
    { name: 'Brit Vet Diets', img: 'assets/logos/brit-vet-diets-logo.jpg', id: 'brit-vet-diets' },
    { name: 'Equilibrio', img: 'assets/logos/equilibrio-logo.jpg', id: 'equilibrio' },
    { name: 'Vet Solution', img: 'assets/logos/vet-solution-logo.jpg', id: 'vet-solution' },
  ];
}
