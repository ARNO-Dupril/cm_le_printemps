import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface ErrorMessage {
  message: string;
  showMessage: boolean;
  error: boolean;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password = '';
  showPassword = false;
  loginForm: FormGroup;
  errorMessages: ErrorMessage[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessages = [];

    if (this.loginForm.invalid) {
      if (this.loginForm.get('email')?.invalid) {
        this.addErrorMessage('veillez entrer un email valide s\'il vous plait!!.');
      }
      if (this.loginForm.get('password')?.invalid) {
        this.addErrorMessage('Veillez entrer un mot de passe valide (8 caracteres au minimum).');
      }
    } else {
      // Traiter le formulaire valide ici
      this.addSuccessMessage('votre formulaire est valide.');
      console.log('Form submitted:', this.loginForm.value);
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
