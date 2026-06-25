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
];
