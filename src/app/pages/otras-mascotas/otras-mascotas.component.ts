import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { OtrasMascotasProduct } from '../../data/marcas.data';

@Component({
  selector: 'app-otras-mascotas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './otras-mascotas.component.html',
  styleUrl: './otras-mascotas.component.css'
})
export class OtrasMascotasComponent implements OnInit {
  private sheetsService = inject(GoogleSheetsService);
  
  products = signal<OtrasMascotasProduct[]>([]);
  loading = signal<boolean>(true);

  async ngOnInit() {
    this.loading.set(true);
    const data = await this.sheetsService.getOtrasMascotas();
    this.products.set(data);
    this.loading.set(false);
  }
}
