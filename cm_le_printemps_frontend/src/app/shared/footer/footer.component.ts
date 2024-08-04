import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../../services/service/service.service';

interface ErrorMessage {
  message: string;
  showMessage: boolean;
  error: boolean;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  
  newsletterForm: FormGroup;
  errorMessages: ErrorMessage[] = [];
  
  constructor(private formBuilder: FormBuilder, private service: ServiceService) {
    this.newsletterForm = this.formBuilder.group({
      newsletter: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.errorMessages = [];

    if (this.newsletterForm.invalid) {
      if (this.newsletterForm.get('newsletter')?.invalid) {
        this.addErrorMessage('veillez entrer un email valide s\'il vous plait!!.');
      }
    } else {
      // Traiter le formulaire valide ici
      try {
        const { newsletter } = this.newsletterForm.value;
        this.service.addNewsletter(newsletter)
        .then(response => {
          if (response.data) {
            this.addSuccessMessage(response.message); 
          } else {
            this.addErrorMessage(response.message);
          }
          this.newsletterForm.reset();
        })
      } catch (error) {
        console.error(error);
        // Afficher un message d'erreur
        this.addErrorMessage('Une erreur s\'est produite!!  \n Veillez reessayer!!');
      }
    }
  }

  addErrorMessage(message: string) {
    this.errorMessages.push({ message, showMessage: true, error: true });
    setTimeout(() => {
      this.errorMessages[this.errorMessages.length - 1].showMessage = false;
    }, 30000);
  }

  addSuccessMessage(message: string) {
    this.errorMessages.push({ message, showMessage: true, error: false });
    setTimeout(() => {
      this.errorMessages[this.errorMessages.length - 1].showMessage = false;
    }, 30000);
  }

  dismissErrorMessage(index: number) {
    this.errorMessages.splice(index, 1);
  }
}
