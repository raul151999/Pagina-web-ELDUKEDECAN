import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  template: `
    @if (visible()) {
      <button
        class="scroll-to-top"
        (click)="scrollToTop()"
        aria-label="Volver arriba"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    }
  `,
  styles: [
    `
      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          opacity: 1;
          transform: scale(1.08);
        }
        70% {
          transform: scale(0.95);
        }
        100% {
          transform: scale(1);
        }
      }

      .scroll-to-top {
        position: fixed;
        bottom: 100px;
        right: 24px;
        z-index: var(--z-fab);
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: white;
        box-shadow: var(--shadow-md);
        color: var(--color-primary);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-base);
        animation: bounceIn 0.4s ease-out;
      }

      .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg);
      }

      .scroll-to-top:active {
        transform: translateY(-1px);
      }
    `,
  ],
})
export class ScrollToTopComponent {
  visible = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.visible.set(window.scrollY > 400);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
