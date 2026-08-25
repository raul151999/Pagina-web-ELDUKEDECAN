import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { OtrasMascotasProduct } from '../../data/marcas.data';

@Component({
  selector: 'app-farmacia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmacia.component.html',
  styleUrl: './farmacia.component.css'
})
export class FarmaciaComponent implements OnInit {
  private sheetsService = inject(GoogleSheetsService);
  
  products = signal<OtrasMascotasProduct[]>([]);
  loading = signal<boolean>(true);

  // Pagination
  currentPage = signal<number>(1);
  itemsPerPage = 6;

  pagedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.products().slice(start, start + this.itemsPerPage);
  });

  totalPages = computed(() => {
    return Math.ceil(this.products().length / this.itemsPerPage);
  });

  pagesArray = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages = [];
    
    let startPage = Math.max(1, current - 4);
    let endPage = Math.min(total, startPage + 9);
    
    if (endPage - startPage < 9) {
      startPage = Math.max(1, endPage - 9);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  });

  async ngOnInit() {
    this.loading.set(true);
    const data = await this.sheetsService.getFarmacia();
    this.products.set(data);
    this.loading.set(false);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // --- Modal Logic ---
  selectedProductForModal = signal<OtrasMascotasProduct | null>(null);
  productQuantity = signal<number>(1);

  openModal(product: OtrasMascotasProduct) {
    this.selectedProductForModal.set(product);
    this.productQuantity.set(1);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedProductForModal.set(null);
    document.body.style.overflow = '';
  }

  incrementQuantity() {
    this.productQuantity.update(q => q + 1);
  }

  decrementQuantity() {
    this.productQuantity.update(q => (q > 1 ? q - 1 : 1));
  }

  getWhatsAppLink(): string {
    const p = this.selectedProductForModal();
    if (!p) return 'https://wa.me/51946959338';

    let text = `Hola eldukedecan, quiero adquirir este producto.
Producto: ${p.name} - ${p.description}
Cantidad: ${this.productQuantity()}`;

    return `https://wa.me/51946959338?text=${encodeURIComponent(text)}`;
  }
}
