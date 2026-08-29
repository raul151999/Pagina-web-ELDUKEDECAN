import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Marca, Product, OtrasMascotasProduct, AccesorioProduct } from '../data/marcas.data';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  private http = inject(HttpClient);
  // El link público del CSV
  private readonly CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT25814pDAfVvvnsAjNeZ3hvxWV9gGRtaj5WK9PkQVBIp901xMKdBxT2H_puHoMdIepCLkQ1sQY5h0U/pub?output=csv';

  async getCatalog(): Promise<Record<string, Marca>> {
    try {
      // Agregamos un parámetro de tiempo para evitar que el navegador guarde en caché (cache-busting)
      const url = `${this.CSV_URL}&t=${Date.now()}`;
      const csvData = await firstValueFrom(this.http.get(url, { responseType: 'text' }));
      return this.parseCsvToMarcas(csvData);
    } catch (error) {
      console.error('Error cargando los datos de Google Sheets:', error);
      return {};
    }
  }

  async getOtrasMascotas(): Promise<OtrasMascotasProduct[]> {
    try {
      // Usamos el gid específico para la Hoja 2
      const url = `${this.CSV_URL}&gid=501697905&t=${Date.now()}`;
      const csvData = await firstValueFrom(this.http.get(url, { responseType: 'text' }));
      return this.parseCsvToOtrasMascotas(csvData);
    } catch (error) {
      console.error('Error cargando los datos de Otras Mascotas:', error);
      return [];
    }
  }

  async getAccesorios(): Promise<AccesorioProduct[]> {
    try {
      // REEMPLAZAR 'GID_ACCESORIOS' por el GID de la hoja 3 (Accesorios)
      const url = `${this.CSV_URL}&gid=139935454&t=${Date.now()}`;
      const csvData = await firstValueFrom(this.http.get(url, { responseType: 'text' }));
      return this.parseCsvToAccesorios(csvData);
    } catch (error) {
      console.error('Error cargando los datos de Accesorios:', error);
      return [];
    }
  }

  async getFarmacia(): Promise<OtrasMascotasProduct[]> {
    try {
      // REEMPLAZAR 'GID_FARMACIA' por el GID de la hoja 4 (Farmacia)
      const url = `${this.CSV_URL}&gid=1089516330&t=${Date.now()}`;
      const csvData = await firstValueFrom(this.http.get(url, { responseType: 'text' }));
      return this.parseCsvToOtrasMascotas(csvData);
    } catch (error) {
      console.error('Error cargando los datos de Farmacia:', error);
      return [];
    }
  }

  private parseCsvToMarcas(csv: string): Record<string, Marca> {
    const lines = csv.split('\n');
    const marcasData: Record<string, Marca> = {};

    // Configuración base de cada marca (descripciones y logos)
    const baseConfig: Record<string, any> = {
      "Hill's PD": { id: 'hills-pd', desc: 'Nutrición clínica de vanguardia para tratar diversas condiciones de salud.', logo: 'assets/logos/hills-logo.png' },
      "Hill's SD": { id: 'hills-sd', desc: 'Nutrición basada en la biología para anticiparse a sus necesidades.', logo: 'assets/logos/hills-logo.png' },
      "Pro Plan": { id: 'proplan', desc: 'Nutrición de última generación respaldada por científicos.', logo: 'assets/logos/pro-plan-logo.png' },
      "Brit Care": { id: 'brit-care', desc: 'Fórmulas hipoalergénicas para el máximo cuidado.', logo: 'assets/logos/brit-care-logo.png' },
      "Brit Premium": { id: 'brit-premium', desc: 'Excelente palatabilidad y digestibilidad con alta proteína.', logo: 'assets/logos/brit-premium-logo.png' },
      "Nutram": { id: 'nutram', desc: 'Recetas holísticas y naturales que optimizan la salud.', logo: 'assets/logos/nutram-logo.png' },
      "Monge": { id: 'monge', desc: 'La máxima calidad de la nutrición italiana.', logo: 'assets/logos/monge-logo.png' },
      "Canbo": { id: 'canbo', desc: 'Nutrición súper premium diseñada para exigencias especiales.', logo: 'assets/logos/canbo-logo.png', banner: 'assets/banners/canbo-banner.png' },
      "Ricocan": { id: 'ricocan', desc: 'Alimento completo y balanceado.', logo: 'assets/logos/ricocan-logo.png', banner: 'assets/banners/ricocan-banner.png' },
      "Ricocat": { id: 'ricocan', desc: 'Alimento completo y balanceado.', logo: 'assets/logos/ricocan-logo.png' },
      "Origen": { id: 'origen', desc: 'Alimentación biológicamente apropiada.', logo: 'assets/logos/origen-logo.png' },
      "Dr. Clauder's": { id: 'dr-clauders', desc: 'Nutrición super premium alemana.', logo: 'assets/logos/dr-clauders-logo.png' },
      "Brit Vet Diets": { id: 'brit-vet-diets', desc: 'Nutrición clínica avanzada.', logo: 'assets/logos/brit-vet-diets-logo.png' },
      "Equilibrio": { id: 'equilibrio', desc: 'Nutrición super premium de alto rendimiento.', logo: 'assets/logos/equilibrio-logo.png' },
      "Vet Solution": { id: 'vet-solution', desc: 'Dietas veterinarias especializadas.', logo: 'assets/logos/vet-solution-logo.png' }
    };

    // Saltar la cabecera (índice 0)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Parsear CSV respetando comillas (para textos con comas)
      const rawColumns = [];
      let current = '';
      let inQuotes = false;
      for (let char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          rawColumns.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      rawColumns.push(current);

      // Limpiar comillas iniciales/finales
      const columns = rawColumns.map(c => c.replace(/^"|"$/g, '').trim());

      if (columns.length < 5) continue;

      const marcaNombre = columns[0];
      const especie = columns[1];
      const nombreProd = columns[2];
      const descProd = columns[3];
      // Nueva estructura de columnas:
      // 0: Marca
      // 1: Especie
      // 2: Nombre Prod
      // 3: Desc Prod (sin kg)
      // 4: URL Imagen
      // 5: Desc Larga
      // 6: Promocion
      // 7: Peso 1, 8: Precio 1, 9: Peso 2, 10: Precio 2, etc.

      const urlImagen = columns.length >= 5 ? columns[4] : undefined;
      const descLarga = columns.length >= 6 ? columns[5] : undefined;
      const promocion = columns.length >= 7 && columns[6].trim() !== '' ? columns[6].trim() : undefined;

      const marcaConfig = baseConfig[marcaNombre] || { id: marcaNombre.toLowerCase().replace(/ /g, '-'), desc: '', logo: '' };
      const marcaId = marcaConfig.id;

      if (!marcasData[marcaId]) {
        marcasData[marcaId] = { ...marcaConfig, name: marcaNombre, products: [] };
      }

      const animalType = especie.toLowerCase().includes('perro') ? 'perro' : 'gato';
      const icon = animalType === 'perro' ? '🐕' : '🐈';

      const nameAndDesc = (nombreProd + ' ' + descProd).toLowerCase();
      const tags: string[] = [];

      if (nameAndDesc.includes('puppy') || nameAndDesc.includes('cachorro') || nameAndDesc.includes('kitten') || nameAndDesc.includes('gatito') || nameAndDesc.includes('junior')) {
        tags.push('cachorro');
      }
      if (nameAndDesc.includes('senior') || nameAndDesc.includes('7+')) {
        tags.push('senior');
      }
      if (nameAndDesc.includes('adult') || nameAndDesc.includes('adulto')) {
        tags.push('adulto');
      }
      if (nameAndDesc.includes('urinar') || nameAndDesc.includes('renal') || nameAndDesc.includes('kidney') || nameAndDesc.includes('digest') || nameAndDesc.includes('sensit') || nameAndDesc.includes('sensibil') || nameAndDesc.includes('peso') || nameAndDesc.includes('weight') || nameAndDesc.includes('esteril') || nameAndDesc.includes('steriliz') || nameAndDesc.includes('hipoalerg') || nameAndDesc.includes('cuidado') || nameAndDesc.includes('care') || nameAndDesc.includes('light')) {
        tags.push('especiales');
      }

      const variants = [];
      // Leer las variantes (Peso, Precio, Precio Antiguo) a partir de la columna 7
      for (let i = 7; i < columns.length; i += 3) {
        const peso = columns[i]?.trim();
        const precio = columns[i + 1]?.trim();
        const precioAntiguo = columns[i + 2]?.trim();

        if (peso && precio) {
          variants.push({
            weight: peso,
            price: precio,
            ...(precioAntiguo ? { oldPrice: precioAntiguo } : {}),
            rawDescription: descProd ? `${descProd} - ${peso}` : peso
          });
        }
      }

      // Si no hay ninguna variante, podemos definir un precio fallback (por ejemplo 0.00 o vacío)
      const basePrice = variants.length > 0 ? variants[0].price : 'S/ 0.00';

      const product: Product = {
        name: nombreProd,
        description: descProd,
        price: basePrice,
        icon: icon,
        animal: animalType,
        tags: tags,
        ...(promocion ? { promotion: promocion } : {}),
        ...(urlImagen && urlImagen.startsWith('http') ? { image: urlImagen } : {}),
        ...(descLarga ? { longDescription: descLarga } : {}),
        variants: variants
      };

      marcasData[marcaId].products.push(product);
    }

    return marcasData;
  }

  private parseCsvToOtrasMascotas(csv: string): OtrasMascotasProduct[] {
    const lines = csv.split('\n');
    const products: OtrasMascotasProduct[] = [];

    // Saltar la cabecera (índice 0)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const rawColumns = [];
      let current = '';
      let inQuotes = false;
      for (let char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          rawColumns.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      rawColumns.push(current);

      const columns = rawColumns.map(c => c.replace(/^"|"$/g, '').trim());

      // Estructura: Nombre | Descripción | Imagen | Precio | Categoría (Opcional)
      const name = columns[0];
      const description = columns[1];
      const image = columns[2];
      const price = columns[3];
      const tag = columns.length > 4 ? columns[4] : '';

      if (!name) continue;

      products.push({
        name,
        description,
        image,
        price: price || 'Consultar precio',
        tag: tag || 'Otros'
      });
    }

    return products;
  }

  private parseCsvToAccesorios(csv: string): AccesorioProduct[] {
    const lines = csv.split('\n');
    const products: AccesorioProduct[] = [];

    // Saltar la cabecera (índice 0)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const rawColumns = [];
      let current = '';
      let inQuotes = false;
      for (let char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          rawColumns.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      rawColumns.push(current);

      const columns = rawColumns.map(c => c.replace(/^"|"$/g, '').trim());

      // Estructura: Nombre | Descripción | Imagen | Precio | Mascota | Categoría
      const name = columns[0];
      const description = columns[1] || '';
      const image = columns[2] || '';
      const price = columns[3] || 'Consultar precio';

      let animal = 'perro';
      if (columns.length > 4 && columns[4]) {
        const animalRaw = columns[4].toLowerCase();
        if ((animalRaw.includes('perro') && animalRaw.includes('gato')) || animalRaw.includes('ambos')) {
          animal = 'ambos';
        } else if (animalRaw.includes('gato')) {
          animal = 'gato';
        }
      }

      const category = columns.length > 5 && columns[5] ? columns[5] : 'Otros';

      if (!name) continue;

      products.push({
        name,
        description,
        image,
        price,
        animal,
        category
      });
    }

    return products;
  }
}
