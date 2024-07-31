import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

  today: string;
  selectedDate: string;

  selectedAge: string = 'bebe';
  selectAge(age: string) {
    this.selectedAge = age;
  }

  selectedSexe: string = 'masculin';
  selectSexe(sexe: string) {
    this.selectedAge = sexe;
  }

  selectedService: string = '';
  services = [
    { _id: '0', label: 'option 0' },
    { _id: '1', label: 'option 1' },
    { _id: '2', label: 'option 2' },
    { _id: '3', label: 'option 3' },
    { _id: '4', label: 'option 4' },
    { _id: '5', label: 'option 5' }
  ];

  constructor() {
    // Récupération de la date d'aujourd'hui
    this.today = new Date().toISOString().slice(0, 10);
    // Définition de la valeur par défaut à la date d'aujourd'hui
    this.selectedDate = this.today;
  }

}
