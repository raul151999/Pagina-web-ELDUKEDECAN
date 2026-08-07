import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Marca, Product } from '../../data/marcas.data';
import { GoogleSheetsService } from '../../services/google-sheets.service';

@Component({
  selector: 'app-marca-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './marca-detalle.component.html',
  styleUrl: './marca-detalle.component.css'
})
export class MarcaDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private sheetsService = inject(GoogleSheetsService);

  marcaId = '';
  marca = signal<Marca | null>(null);
  isLoading = signal<boolean>(true);
  
  // Categoría seleccionada por defecto: perro
  selectedCategory = signal<'perro' | 'gato'>('perro');

  // Estado del Modal
  selectedProductForModal = signal<Product | null>(null);
  productQuantity = signal<number>(1);

  // Computed signal to filter products
  filteredProducts = computed(() => {
    const currentMarca = this.marca();
    if (!currentMarca) return [];
    
    return currentMarca.products.filter(p => p.animal === this.selectedCategory());
  });

  // Computed signals to check if there are products for a specific category
  hasPerros = computed(() => {
    const currentMarca = this.marca();
    return currentMarca ? currentMarca.products.some(p => p.animal === 'perro') : false;
  });

  hasGatos = computed(() => {
    const currentMarca = this.marca();
    return currentMarca ? currentMarca.products.some(p => p.animal === 'gato') : false;
  });

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.marcaId = params.get('id') || '';
      this.isLoading.set(true);
      
      const marcasData = await this.sheetsService.getCatalog();
      
      if (marcasData[this.marcaId]) {
        const m = marcasData[this.marcaId];
        this.marca.set(m);
        
        // Auto-select a category that has products
        if (m.products.some(p => p.animal === 'perro')) {
          this.selectedCategory.set('perro');
        } else if (m.products.some(p => p.animal === 'gato')) {
          this.selectedCategory.set('gato');
        }
      } else {
        this.marca.set(null); 
      }
      
      this.isLoading.set(false);
    });
  }

  setCategory(category: 'perro' | 'gato') {
    this.selectedCategory.set(category);
  }

  // --- Modal Logic ---
  openModal(product: Product) {
    this.selectedProductForModal.set(product);
    this.productQuantity.set(1);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
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
    const m = this.marca();
    if (!p || !m) return 'https://wa.me/51946959338';

    const text = `Hola eldukedecan, quiero adquirir este producto.
Producto: ${m.name} - ${p.name} - ${p.description}
Cantidad: ${this.productQuantity()}`;
    return `https://wa.me/51946959338?text=${encodeURIComponent(text)}`;
  }
}
