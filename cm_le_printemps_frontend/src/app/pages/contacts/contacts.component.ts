import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service/service.service';
import { AuthService } from '../../services/server/auth.service';


interface ErrorMessage {
  message: string;
  showMessage: boolean;
  error: boolean;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  errorMessages: ErrorMessage[] = [];
  rdvForm: FormGroup;
  userId: string = "";

  today: string;
  selectedDate: string;

  selectedAge: string = 'bebe';
  selectAge(age: string) {
    this.selectedAge = age;
  }

  selectedSexe: string = 'masculin';
  selectSexe(sexe: string) {
    this.selectedSexe = sexe;
  }

  selectedService: string = '';

  constructor(public service: ServiceService, private formBuilder: FormBuilder, private authService: AuthService) {
   
    // Récupération de la date d'aujourd'hui
    this.today = new Date().toISOString().slice(0, 10);
    // Définition de la valeur par défaut à la date d'aujourd'hui
    this.selectedDate = this.today;
    
    this.rdvForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(25)]],
      prenom: ['', [Validators.required, Validators.maxLength(25)]],
      age: [this.selectedAge],
      sexe: [this.selectedSexe],
      serviceId: ['', [Validators.required]],
      description: ['', [Validators.maxLength(255)]],
      date: [this.today, [Validators.required]]
    });

  }

  ngOnInit(): void {
      this.userId = this.authService.userId;
  }

  initForm(){
    this.rdvForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(25)]],
      prenom: ['', [Validators.required, Validators.maxLength(25)]],
      age: [this.selectedAge],
      sexe: [this.selectedSexe],
      serviceId: ['', [Validators.required]],
      description: ['', [Validators.maxLength(255), Validators.minLength(0)]],
      date: [this.today, [Validators.required]]
    });
  }

  reload(){
    window.location.reload();
  }

  createRdv() {
    
    this.errorMessages = [];

    if (this.rdvForm.invalid) {
      if (this.rdvForm.get('nom')?.invalid) {
        this.addErrorMessage('veillez entrer un nom valide s\'il vous plait!!.');
      }
      if (this.rdvForm.get('prenom')?.invalid) {
        this.addErrorMessage('Veillez entrer un service valide (8 caracteres au minimum).');
      }
    } else {
    console.log("bonjour");
      // Traiter le formulaire valide ici
      try {
        console.log('Form submitted:', this.rdvForm.value);
        const formData  = {
          nom: this.rdvForm.get('nom')?.value,
          prenom: this.rdvForm.get('prenom')?.value,
          description: this.rdvForm.get('description')?.value,
          age: this.selectedAge,
          sexe: this.selectedSexe,
          serviceId: this.rdvForm.get('serviceId')?.value,
          userId: this.userId,
          code: this.service.generateUniqueCode(),
          date: this.rdvForm.get('date')?.value
        }

        this.service
        .createRdv(formData)
        .then(response => {
          if(response.rendezVous || response.demande){
            this.addSuccessMessage("Demande de rendez-vous effectuée avec succes");
            this.rdvForm.reset();
            // this.reload();
          }else{
            this.addErrorMessage("une erreur s'est produite pendant l'enregistrement de ce rendez-vous !!\n Veillez verifier la console du navigateur pour plus de detail !");
            console.log("une erreur s'est produite pendant l'enregistrement de ce rendez-vous !!\n", {erreur: response.message}); 
          }
        })
        .catch(err => {
          this.addErrorMessage("une erreur s'est produite pendant l'enregistrement de ce rendez-vous !!\n Veillez verifier la console du navigateur pour plus de detail !");
          console.log("une erreur s'est produite pendant l'enregistrement de ce rendez-vous !!\n", {erreur: err}); 
        })
      } catch (error) {
        console.error(error);
        // Afficher un message d'erreur
        this.addSuccessMessage('Une erreur s\'est produite!!  \n Veillez reessayer!!');
      }
    }




    // if (this.rdvForm.valid) {
    //   const rdvData = this.rdvForm.value;

    //   fetch('http://localhost:4500/api/create/create-rdv', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(rdvData)
    //   })
    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error('Réseau de réponse non OK');
    //       }
    //       return response.json();
    //     })
    //     .then(data => {
    //       console.log('Rendez-vous créé :', data);
    //     })
    //     .catch(error => {
    //       console.error('Erreur lors de la création du rendez-vous :', error);
    //     });

    //   this.rdvForm.reset(); // Réinitialiser le formulaire après envoi
    // }
  }




  addErrorMessage(message: string) {
    this.errorMessages.push({ message, showMessage: true, error: true });
    setTimeout(() => {
      this.errorMessages[this.errorMessages.length - 1].showMessage = false;
    }, 3000);
  }

  addSuccessMessage(message: string) {
    this.errorMessages.push({ message, showMessage: true, error: false });
    setTimeout(() => {
      this.errorMessages[this.errorMessages.length - 1].showMessage = false;
    }, 3000);
  }

  dismissErrorMessage(index: number) {
    this.errorMessages.splice(index, 1);
  }


}
