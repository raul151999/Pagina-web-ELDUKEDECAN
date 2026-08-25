import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { Product, ProductVariant, Marca, OtrasMascotasProduct } from '../../data/marcas.data';

export interface SearchableProduct {
  type: 'marca' | 'otra';
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  icon?: string;
  category: string; // Nombre de la marca o "Otras Mascotas"
  originalData: any; // Product o OtrasMascotasProduct
  brandData?: Marca; 
}

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './global-search.component.html',
  styleUrl: './global-search.component.css'
})
export class GlobalSearchComponent implements OnInit {
  private sheetsService = inject(GoogleSheetsService);

  searchQuery = signal('');
  showSuggestions = signal(false);
  allProducts = signal<SearchableProduct[]>([]);

  // Modal State
  selectedProduct = signal<SearchableProduct | null>(null);
  selectedVariant = signal<ProductVariant | null>(null);
  productQuantity = signal<number>(1);

  filteredSuggestions = computed(() => {
    let query = this.searchQuery().toLowerCase().trim();
    if (!query) return [];

    // Remover apóstrofes y tildes para la búsqueda
    query = query.replace(/'/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Separar por palabras para que no importe el orden
    const queryWords = query.split(/\s+/);

    return this.allProducts().filter(p => {
      const nameNorm = p.name.toLowerCase().replace(/'/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const catNorm = p.category.toLowerCase().replace(/'/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const descNorm = p.description ? p.description.toLowerCase().replace(/'/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';
      
      const fullText = `${nameNorm} ${catNorm} ${descNorm}`;
      
      // Tiene que contener TODAS las palabras que el usuario escribió
      return queryWords.every(word => fullText.includes(word));
    }).slice(0, 8); // Limit to 8 suggestions
  });

  async ngOnInit() {
    // Load all products in background
    const [marcasObj, otrasMascotasArray, accesoriosArray, farmaciaArray] = await Promise.all([
      this.sheetsService.getCatalog(),
      this.sheetsService.getOtrasMascotas(),
      this.sheetsService.getAccesorios(),
      this.sheetsService.getFarmacia()
    ]);

    const products: SearchableProduct[] = [];

    // Parse Marcas
    Object.values(marcasObj).forEach(marca => {
      marca.products.forEach((p, idx) => {
        products.push({
          type: 'marca',
          id: `m-${marca.id}-${idx}`,
          name: p.name,
          description: p.description,
          price: p.variants && p.variants.length > 0 ? `Desde ${p.variants[0].price}` : p.price,
          image: p.image,
          icon: p.icon,
          category: marca.name,
          originalData: p,
          brandData: marca
        });
      });
    });

    // Parse Otras Mascotas
    otrasMascotasArray.forEach((p, idx) => {
      products.push({
        type: 'otra',
        id: `o-${idx}`,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        category: 'Otras Mascotas',
        originalData: p
      });
    });

    // Parse Accesorios
    accesoriosArray.forEach((p, idx) => {
      products.push({
        type: 'otra',
        id: `a-${idx}`,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        category: 'Accesorios',
        originalData: p
      });
    });

    // Parse Farmacia
    farmaciaArray.forEach((p, idx) => {
      products.push({
        type: 'otra',
        id: `f-${idx}`,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        category: 'Farmacia',
        originalData: p
      });
    });
    

    this.allProducts.set(products);
  }

  onSearchInput() {
    this.showSuggestions.set(true);
  }

  onSearchInputEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.showSuggestions.set(true);
  }

  hideSuggestions() {
    setTimeout(() => this.showSuggestions.set(false), 200);
  }

  selectSuggestion(item: SearchableProduct) {
    this.searchQuery.set('');
    this.showSuggestions.set(false);
    this.openModal(item);
  }

  // --- Modal Logic ---
  openModal(product: SearchableProduct) {
    this.selectedProduct.set(product);
    
    if (product.type === 'marca') {
      const p = product.originalData as Product;
      if (p.variants && p.variants.length > 0) {
        this.selectedVariant.set(p.variants[0]);
      } else {
        this.selectedVariant.set(null);
      }
    } else {
      this.selectedVariant.set(null);
    }
    
    this.productQuantity.set(1);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedProduct.set(null);
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

  pricePerKg = computed(() => {
    const v = this.selectedVariant();
    if (!v) return '';
    
    const kgMatch = v.weight.match(/(\d+(?:\.\d+)?)/);
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

  getWhatsAppLink(): string {
    const searchItem = this.selectedProduct();
    if (!searchItem) return 'https://wa.me/51946959338';

    const v = this.selectedVariant();
    const qty = this.productQuantity();
    
    let text = `Hola eldukedecan, quiero adquirir este producto.\n`;
    
    if (searchItem.type === 'marca') {
      const p = searchItem.originalData as Product;
      const m = searchItem.brandData as Marca;
      const desc = v ? v.rawDescription : p.description;
      text += `Producto: ${m.name} - ${p.name} - ${desc}\n`;
      text += `Cantidad: ${qty}`;
      if (p.promotion) {
        text += `\n*Promoción aplicada:* ${p.promotion}`;
      }
    } else {
      const p = searchItem.originalData as OtrasMascotasProduct;
      text += `Producto: ${p.name} - ${p.description}\n`;
      text += `Cantidad: ${qty}`;
    }

    return `https://wa.me/51946959338?text=${encodeURIComponent(text)}`;
  }
}
