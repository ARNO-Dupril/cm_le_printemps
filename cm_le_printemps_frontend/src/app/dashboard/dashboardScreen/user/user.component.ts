import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../services/service/service.service';

interface ErrorMessage {
  message: string;
  showMessage: boolean;
  error: boolean;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  errorMessages: ErrorMessage[] = [];
  showPassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  userForm: FormGroup;

  isAdmin: boolean = false;
  changeIsAdmin(state: boolean){
    this.isAdmin = state;
  }

  
  imageUrl: string | null = null;
  profil: File | null = null;
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.readFile(file);
      this.profil = file;
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      
    };
    reader.readAsDataURL(file);
  }

  constructor(private formBuilder: FormBuilder, public service: ServiceService){
    this.userForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(25)]],
      prenom: ['', [Validators.required, Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      userRole: [0, [Validators.required]],
      telephone: [[Validators.maxLength(9)]],
      profil: [null]
    });
  }

  ngOnInit(): void {
      this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(25)]],
      prenom: ['', [Validators.required, Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      userRole: [0, [Validators.required]],
      telephone: ['', [Validators.maxLength(9)]],
      profil: [null]
    });
  }

  reload(){
    window.location.reload();
  }

  onSubmit(){
    this.errorMessages = [];

    if (this.userForm.invalid) {
      if (this.userForm.get('nom')?.invalid) {
        this.addErrorMessage('veillez entrer un code valide s\'il vous plait!!.');
      }
      if (this.userForm.get('email')?.invalid) {
        this.addErrorMessage('Veillez entrer un nom valide (8 caracteres au minimum).');
      }
    } else {
      // Traiter le formulaire valide ici
      try {
        console.log('Form submitted:', this.userForm.value);
        const formData  = {
          nom: this.userForm.get('nom')?.value,
          prenom: this.userForm.get('prenom')?.value,
          username: this.userForm.get('username')?.value,
          email: this.userForm.get('email')?.value,
          password: this.userForm.get('password')?.value,
          userRole: this.isAdmin ? 1 : 0,
          telephone: this.userForm.get('telephone')?.value,
          profil: this.profil
        }
        
        this.service
        .addUser(formData)
        .then(response => {
          if(response.success){
            this.addSuccessMessage(response.message);
            this.userForm.reset();
            this.profil = null;
            this.reload();
          }else{
            this.addErrorMessage("une erreur s'est produite pendant l'enregistrement de cet utilisateur !!\n Veillez verifier la console du navigateur pour plus de detail !");
            console.log("une erreur s'est produite pendant l'enregistrement de cet utilisateur !!\n", {erreur: response.message}); 
          }
        })
        .catch(err => {
          this.addErrorMessage("une erreur s'est produite pendant l'enregistrement de cet utilisateur !!\n Veillez verifier la console du navigateur pour plus de detail !");
          console.log("une erreur s'est produite pendant l'enregistrement de cet utilisateur !!\n", {erreur: err}); 
        })
      } catch (error) {
        console.error(error);
        // Afficher un message d'erreur
        this.addSuccessMessage('Une erreur s\'est produite!!  \n Veillez reessayer!!');
      }
    }
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
