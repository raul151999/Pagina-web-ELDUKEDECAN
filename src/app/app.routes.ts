import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'ofertas',
    loadComponent: () =>
      import('./pages/promos/promos.component').then((m) => m.PromosComponent),
  },
  {
    path: 'marcas/:id',
    loadComponent: () =>
      import('./pages/marca-detalle/marca-detalle.component').then((m) => m.MarcaDetalleComponent),
  },
  {
    path: 'ofertas/:id',
    loadComponent: () =>
      import('./pages/oferta-detalle/oferta-detalle.component').then((m) => m.OfertaDetalleComponent),
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./pages/servicios/servicios.component').then(
        (m) => m.ServiciosComponent
      ),
  },
  {
    path: 'servicios/:id',
    loadComponent: () =>
      import('./pages/servicio-detalle/servicio-detalle.component').then(
        (m) => m.ServicioDetalleComponent
      ),
  },
  {
    path: 'agenda-una-cita',
    loadComponent: () =>
      import('./pages/agenda/agenda-una-cita.component').then(
        (m) => m.AgendaUnaCitaComponent
      ),
  },
  {
    path: 'contactanos',
    loadComponent: () =>
      import('./pages/contactanos/contactanos.component').then(
        (m) => m.ContactanosComponent
      ),
  },
  {
    path: 'nuestra-historia',
    loadComponent: () =>
      import('./pages/nuestra-historia/nuestra-historia.component').then(
        (m) => m.NuestraHistoriaComponent
      ),
  },
  {
    path: 'nuestro-proposito',
    loadComponent: () =>
      import('./pages/nuestro-proposito/nuestro-proposito.component').then(
        (m) => m.NuestroPropositoComponent
      ),
  },
  {
    path: 'groomers',
    loadComponent: () =>
      import('./pages/groomers/groomers.component').then(
        (m) => m.GroomersComponent
      ),
  },
  {
    path: 'veterinarios',
    loadComponent: () =>
      import('./pages/veterinarios/veterinarios.component').then(
        (m) => m.VeterinariosComponent
      ),
  },
  {
    path: 'reclamos-y-quejas',
    loadComponent: () =>
      import('./pages/reclamos-quejas/reclamos-quejas.component').then(
        (m) => m.ReclamosQuejasComponent
      ),
  },
];

// Forzar recompilación
