import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-carousel.component.html',
  styleUrl: './video-carousel.component.css'
})
export class VideoCarouselComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);

  // =========================================================================
  // ENLACES DE VIDEOS
  // =========================================================================
  // Solo pega el enlace de TikTok o Instagram entre las comillas simples ('').
  // Ejemplo: 'https://www.tiktok.com/@tu_cuenta/video/123456789'
  // IMPORTANTE: Cada enlace debe estar separado por una coma (,) al final, 
  // excepto el último.
  rawLinks = [
    'https://www.tiktok.com/@eldukedecan_veterinaria/video/7676918688775294228?is_from_webapp=1&sender_device=pc&web_id=7662421185204274695',
    'https://www.tiktok.com/@superpet.pe/video/7279326941192539397',
    'https://www.instagram.com/reel/C5_8w_ZOS9Z/'
  ];
  // =========================================================================

  videoUrls: SafeResourceUrl[] = [];

  ngOnInit() {
    this.videoUrls = this.rawLinks
      .map(link => this.getEmbedUrl(link))
      .filter(url => url !== null) as SafeResourceUrl[];
  }

  getEmbedUrl(url: string): SafeResourceUrl | null {
    try {
      if (url.includes('tiktok.com')) {
        // Buscar el ID del video en el enlace de TikTok
        const match = url.match(/\/video\/(\d+)/);
        if (match && match[1]) {
          const embedUrl = `https://www.tiktok.com/embed/v2/${match[1]}`;
          return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        }
      } else if (url.includes('instagram.com')) {
        // Buscar el ID del reel o post en Instagram
        const match = url.match(/\/(reel|p)\/([a-zA-Z0-9_-]+)/);
        if (match && match[2]) {
          const embedUrl = `https://www.instagram.com/p/${match[2]}/embed`;
          return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        }
      }
    } catch (e) {
      console.error('Error procesando el enlace del video:', url, e);
    }
    return null;
  }
}
