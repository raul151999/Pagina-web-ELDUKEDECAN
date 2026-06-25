import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact-footer.component.html',
  styleUrl: './contact-footer.component.css',
})
export class ContactFooterComponent {
  currentYear = new Date().getFullYear();
}
