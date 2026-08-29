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
    { name: 'Origen', img: 'assets/logos/origen-logo.png', id: 'origen' },
    { name: "Dr. Clauder's", img: 'assets/logos/dr-clauders-logo.png', id: 'dr-clauders' },
    { name: 'Brit Vet Diets', img: 'assets/logos/brit-vet-diets-logo.png', id: 'brit-vet-diets' },
    { name: 'Equilibrio', img: 'assets/logos/equilibrio-logo.png', id: 'equilibrio' },
    { name: 'Vet Solution', img: 'assets/logos/vet-solution-logo.png', id: 'vet-solution' },
  ];
}
