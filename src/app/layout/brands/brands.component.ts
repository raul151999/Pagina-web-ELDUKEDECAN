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
    { name: 'Fórmula Natural', img: 'assets/logos/formula-natural-logo.png', id: 'formula-natural' },
    { name: 'Monge', img: 'assets/logos/monge-logo.png', id: 'monge' },
    { name: 'Brit Premium', img: 'assets/logos/brit-premium-logo.png', id: 'brit-premium' },
    { name: 'Canbo', img: 'assets/logos/canbo-logo.png', id: 'canbo' },
    { name: 'Ricocan', img: 'assets/logos/ricocan-logo.png', id: 'ricocan' },
  ];
}
