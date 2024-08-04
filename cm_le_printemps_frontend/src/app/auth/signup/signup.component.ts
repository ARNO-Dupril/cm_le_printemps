import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/server/auth.service';


interface ErrorMessage {
  message: string;
  showMessage: boolean;
  error: boolean;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  password = '';
  cPassword = '';
  showPassword = false;
  showCPassword = false;
  email = '';
  telephone = '';
  signupForm: FormGroup;
  errorMessages: ErrorMessage[] = [];

  constructor(private formBuilder: FormBuilder, private signupService: AuthService, private router:Router) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required], [Validators.minLength(9)]],
      username: ['', [Validators.required], [Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { Validators: [this.comparePassword]});
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  toggleCPassword() {
    this.showCPassword = !this.showCPassword;
  }

  onSubmit() {
    this.errorMessages = [];

    if (this.signupForm.invalid) {
      const signupFormErrors = this.signupForm.errors;
      if (this.signupForm.get('email')?.invalid) {
        this.addErrorMessage('veillez entrer un email valide s\'il vous plait!!.');
      }
      if (this.signupForm.get('telephone')?.errors?.['invalidPhoneNumber']) {
        this.addErrorMessage('Veuillez saisir un numéro de téléphone valide (format : +237 6********ou 6********).');
      }
      if (this.signupForm.get('password')?.invalid || this.signupForm.get('cPassword')?.invalid) {
        this.addErrorMessage('Veuillez saisir un mot de passe valide (au moins 8 caractères) et confirmez-le.');
      }else{
        if (signupFormErrors && signupFormErrors['passwordMismatch']) {
          this.addErrorMessage('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
        }
      }
    } else {

      // if (this.signupForm.valid) {
        // Traiter le formulaire valide ici
        console.log('Form submitted:', this.signupForm.value);
        try {
          this.signupService
          .signup(this.signupForm.value)
          .then((response) => {
            if (response.data) {
              console.log('compte creer avec succes!!! ', response);
              this.router.navigate(['/login']);
            } else {
              console.log(response);
              this.addErrorMessage(!response.general ? JSON.stringify(response) : JSON.stringify(response.general) );
            }
          })
        } catch (error) {
          this.addErrorMessage('une erreur est survenue: '+ error);
          console.log('une erreur est survenue: ', error);
        }
      // }

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
    }, 3000);
  }

  dismissErrorMessage(index: number) {
    this.errorMessages.splice(index, 1);
  }

  validatePhoneNumber(control: FormControl): { [key: string]: boolean } {
    const phoneNumber = control.value;
    const validPhoneNumberRegex = /^(\+237 )?[6]\d{8}$/;
  
    if (!validPhoneNumberRegex.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }
  
    return {};
  }

  comparePassword(form: FormGroup): ValidationErrors | null{
    const password = form.get('password')?.value;
    const confirmPassword = form.get('cPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return {};
  }

}
