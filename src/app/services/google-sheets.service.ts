import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Marca, Product } from '../data/marcas.data';

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
      "Canbo": { id: 'canbo', desc: 'Nutrición súper premium diseñada para exigencias especiales.', logo: 'assets/logos/canbo-logo.png' },
      "Ricocan": { id: 'ricocan', desc: 'Alimento completo y balanceado.', logo: 'assets/logos/ricocan-logo.png' },
      "Ricocat": { id: 'ricocan', desc: 'Alimento completo y balanceado.', logo: 'assets/logos/ricocan-logo.png' }
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
      const precio = columns[4];
      const urlImagen = columns.length >= 6 ? columns[5] : undefined;
      const descLarga = columns.length >= 7 ? columns[6] : undefined;
      
      const marcaConfig = baseConfig[marcaNombre] || { id: marcaNombre.toLowerCase().replace(/ /g, '-'), desc: '', logo: '' };
      const marcaId = marcaConfig.id;

      if (!marcasData[marcaId]) {
        marcasData[marcaId] = {
          id: marcaId,
          name: marcaNombre === 'Ricocat' ? 'Ricocan' : marcaNombre, // Agrupar Ricocat en Ricocan
          description: marcaConfig.desc,
          logo: marcaConfig.logo,
          products: []
        };
      }

      const animalType = especie.toLowerCase().includes('perro') ? 'perro' : 'gato';
      const icon = animalType === 'perro' ? '🐕' : '🐈';

      const product: Product = {
        name: nombreProd,
        description: descProd,
        price: precio,
        icon: icon,
        animal: animalType,
        ...(urlImagen && urlImagen.startsWith('http') ? { image: urlImagen } : {}),
        ...(descLarga ? { longDescription: descLarga } : {})
      };

      marcasData[marcaId].products.push(product);
    }

    return marcasData;
  }
}
