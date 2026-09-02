import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { Product, ProductVariant, Marca, OtrasMascotasProduct } from '../../data/marcas.data';

export interface SearchableProduct {
  type: 'marca' | 'otra' | 'pagina';
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  icon?: string;
  category: string; // Nombre de la marca o "Otras Mascotas"
  originalData: any; // Product o OtrasMascotasProduct
  brandData?: Marca; 
  url?: string;
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
  private router = inject(Router);

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
      
      let keywords = '';
      if (p.type === 'pagina' && p.originalData?.keywords) {
        keywords = p.originalData.keywords.toLowerCase();
      }

      const fullText = `${nameNorm} ${catNorm} ${descNorm} ${keywords}`;
      
      // Tiene que contener TODAS las palabras que el usuario escribió
      return queryWords.every(word => fullText.includes(word));
    }).slice(0, 8); // Limit to 8 suggestions
  });

  private SITE_PAGES = [
    { id: 'p-consulta', name: 'Consulta Veterinaria', desc: 'Reserva una consulta médica para tu mascota', keywords: 'consulta veterinaria doctor medico chequeo cita clinica', url: '/servicios/consulta-veterinaria', icon: '🩺' },
    { id: 'p-grooming', name: 'Baño y Grooming', desc: 'Servicios de peluquería y spa', keywords: 'bano corte grooming spa peluqueria estetica limpieza', url: '/servicios/grooming', icon: '✂️' },
    { id: 'p-vacunacion', name: 'Vacunación', desc: 'Protege a tu mascota con sus vacunas al día', keywords: 'vacunacion vacunas inyeccion preventivo', url: '/servicios/vacunacion', icon: '💉' },
    { id: 'p-cirugia', name: 'Cirugía', desc: 'Intervenciones quirúrgicas seguras', keywords: 'cirugia operacion esterilizacion castracion quirofano', url: '/servicios/cirugia', icon: '🏥' },
    { id: 'p-desparasitacion', name: 'Desparasitación', desc: 'Elimina parásitos internos y externos', keywords: 'desparasitacion parasitos pulgas garrapatas pastilla', url: '/servicios/desparasitacion', icon: '🐛' },
    { id: 'p-laboratorio', name: 'Laboratorio Clínico', desc: 'Análisis de sangre, orina y heces', keywords: 'laboratorio analisis sangre orina heces examen', url: '/servicios/laboratorio-clinico', icon: '🔬' },
    { id: 'p-rayosx', name: 'Rayos X y Ecografía', desc: 'Imágenes diagnósticas de alta resolución', keywords: 'rayos x ecografia radiografia imagenes ultrasonido', url: '/servicios/rayosx-ecografia', icon: '🦴' },
    { id: 'p-farmacia', name: 'Farmacia Veterinaria', desc: 'Medicamentos y productos veterinarios', keywords: 'farmacia pastillas medicamentos remedios botica receta', url: '/farmacia', icon: '💊' },
    { id: 'p-ofertas', name: 'Ofertas y Promociones', desc: 'Descuentos exclusivos y combos', keywords: 'ofertas promociones descuentos combos barato rebajas', url: '/ofertas', icon: '🎁' },
    { id: 'p-accesorios', name: 'Accesorios para Mascotas', desc: 'Juguetes, camas, collares y más', keywords: 'accesorios juguetes camas ropa collares correas', url: '/accesorios', icon: '🧸' },
    { id: 'p-contacto', name: 'Agenda / Contacto', desc: 'Contáctanos o visítanos', keywords: 'agenda contacto ubicacion telefono whatsapp direccion mensaje cita', url: '/agenda-una-cita', icon: '📅' },
    { id: 'p-historia', name: 'Nuestra Historia', desc: 'Conoce más sobre nosotros', keywords: 'historia nosotros quienes somos clinica', url: '/nuestra-historia', icon: '🏥' },
    { id: 'p-equipo', name: 'Nuestro Equipo', desc: 'Conoce a nuestros veterinarios y groomers', keywords: 'equipo veterinarios groomers staff personal doctores', url: '/veterinarios', icon: '👥' },
    { id: 'p-otras-mascotas', name: 'Otras Mascotas', desc: 'Alimentos y productos para otras mascotas', keywords: 'otras mascotas conejos hamsters aves roedores peces', url: '/otras-mascotas', icon: '🐹' },
    { id: 'p-reclamos', name: 'Reclamos y Quejas', desc: 'Libro de reclamaciones', keywords: 'reclamos quejas libro reclamaciones problema', url: '/reclamos-y-quejas', icon: '📖' }
  ];

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
    
    // Parse Pages
    this.SITE_PAGES.forEach(page => {
      products.push({
        type: 'pagina',
        id: page.id,
        name: page.name,
        description: page.desc,
        price: '',
        icon: page.icon,
        category: 'Sección de la web',
        originalData: page,
        url: page.url
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

  onEnterPressed() {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return;

    const normalizedQuery = query.replace(/'/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Extraer todas las marcas únicas
    const allBrands = new Map<string, string>();
    this.allProducts().forEach(p => {
      if (p.type === 'marca' && p.brandData) {
         const bName = p.brandData.name.toLowerCase().replace(/'/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
         allBrands.set(bName, p.brandData.id);
      }
    });

    // 1. Coincidencia exacta con marca
    if (allBrands.has(normalizedQuery)) {
       const brandId = allBrands.get(normalizedQuery);
       this.router.navigate(['/marcas', brandId]);
       this.searchQuery.set('');
       this.showSuggestions.set(false);
       return;
    }

    // 2. Coincidencia parcial con marca
    for (const [bName, bId] of allBrands.entries()) {
      if (bName.includes(normalizedQuery) || normalizedQuery.includes(bName)) {
         this.router.navigate(['/marcas', bId]);
         this.searchQuery.set('');
         this.showSuggestions.set(false);
         return;
      }
    }

    // 3. Si no es marca, seleccionar el primer producto de las sugerencias
    const suggestions = this.filteredSuggestions();
    if (suggestions.length > 0) {
      this.selectSuggestion(suggestions[0]);
    }
  }

  selectSuggestion(item: SearchableProduct) {
    this.searchQuery.set('');
    this.showSuggestions.set(false);
    
    if (item.type === 'pagina') {
      if (item.url) {
        this.router.navigateByUrl(item.url);
      }
    } else {
      this.openModal(item);
    }
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
