import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Marca, Product, ProductVariant } from '../../data/marcas.data';
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

  // Filtros colapsables
  isFilterOpen = signal<boolean>(false);
  selectedTags = signal<Record<string, boolean>>({
    cachorro: false,
    adulto: false,
    senior: false,
    especiales: false
  });

  // Estado del Modal
  selectedProductForModal = signal<Product | null>(null);
  selectedVariant = signal<ProductVariant | null>(null);
  productQuantity = signal<number>(1);

  // Paginación
  displayLimit = signal<number>(6);

  // Computed signal to filter all products
  allFilteredProducts = computed(() => {
    const currentMarca = this.marca();
    if (!currentMarca) return [];
    
    const activeTags = Object.entries(this.selectedTags())
      .filter(([_, isActive]) => isActive)
      .map(([tag, _]) => tag);

    return currentMarca.products.filter(p => {
      const matchAnimal = p.animal === this.selectedCategory();
      
      // Si no hay filtros seleccionados, mostramos todos los del animal
      let matchTags = true;
      if (activeTags.length > 0) {
        // Mostramos si el producto tiene al menos UNO de los tags seleccionados
        matchTags = p.tags ? activeTags.some(tag => p.tags!.includes(tag)) : false;
      }
      
      return matchAnimal && matchTags;
    });
  });

  // Pagination
  currentPage = signal(1);
  itemsPerPage = 6;

  // Computed signal for visible products based on pagination
  visibleProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.allFilteredProducts().slice(start, start + this.itemsPerPage);
  });

  totalPages = computed(() => {
    return Math.ceil(this.allFilteredProducts().length / this.itemsPerPage);
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

  // Computed signals to check if there are products for a specific category
  hasPerros = computed(() => {
    const currentMarca = this.marca();
    return currentMarca ? currentMarca.products.some(p => p.animal === 'perro') : false;
  });

  hasGatos = computed(() => {
    const currentMarca = this.marca();
    return currentMarca ? currentMarca.products.some(p => p.animal === 'gato') : false;
  });

  pricePerKg = computed(() => {
    const v = this.selectedVariant();
    if (!v) return '';
    
    // Attempt to extract numeric weight and price
    const kgMatch = v.weight.match(/(\d+(?:\.\d+)?)/);
    // Remove "S/ " and commas from price before parsing
    const cleanPrice = v.price.replace(/[^\d.]/g, '');
    const priceValue = parseFloat(cleanPrice);

    if (kgMatch && !isNaN(priceValue)) {
      const kg = parseFloat(kgMatch[1]);
      if (kg > 0) {
        return `(S/ ${(priceValue / kg).toFixed(2)} x KG)`;
      }
    }
    return '';
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
      
      this.currentPage.set(1); // Reset page on route change
      this.isLoading.set(false);
    });
  }

  setCategory(category: 'perro' | 'gato') {
    this.selectedCategory.set(category);
    this.currentPage.set(1); // Reset page on category change
  }

  toggleFilter() {
    this.isFilterOpen.update(v => !v);
  }

  toggleTag(tag: string) {
    this.selectedTags.update(current => ({
      ...current,
      [tag]: !current[tag]
    }));
    this.currentPage.set(1); // Reset page on filter change
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // --- Modal Logic ---
  openModal(product: Product) {
    this.selectedProductForModal.set(product);
    if (product.variants && product.variants.length > 0) {
      this.selectedVariant.set(product.variants[0]);
    } else {
      this.selectedVariant.set(null);
    }
    this.productQuantity.set(1);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal() {
    this.selectedProductForModal.set(null);
    this.selectedVariant.set(null);
    document.body.style.overflow = '';
  }

  selectVariant(variant: ProductVariant) {
    this.selectedVariant.set(variant);
  }

  incrementQuantity() {
    this.productQuantity.update(q => q + 1);
  }

  decrementQuantity() {
    this.productQuantity.update(q => (q > 1 ? q - 1 : 1));
  }

  getWhatsAppLink(): string {
    const p = this.selectedProductForModal();
    const v = this.selectedVariant();
    const m = this.marca();
    if (!p || !m) return 'https://wa.me/51946959338';

    const desc = v ? v.rawDescription : p.description;
    let text = `Hola eldukedecan, quiero adquirir este producto.
Producto: ${m.name} - ${p.name} - ${desc}
Cantidad: ${this.productQuantity()}`;

    if (p.promotion) {
      text += `\n*Promoción aplicada:* ${p.promotion}`;
    }

    return `https://wa.me/51946959338?text=${encodeURIComponent(text)}`;
  }
}
