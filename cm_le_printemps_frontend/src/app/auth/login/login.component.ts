import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/server/auth.service';

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
export class LoginComponent implements OnInit {
  password = '';
  showPassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  loginForm: FormGroup;
  errorMessages: ErrorMessage[] = [];

  constructor(private formBuilder: FormBuilder, private loginService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    // this.show();
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
      try {
        const { email, password } = this.loginForm.value;
        this.loginService
        .login(email, password)
        .then(response => {
          if (response.success) {
            // Stocker le jeton d'authentification dans le stockage local ou les cookies
            localStorage.setItem('token', response.token);
            const token = localStorage.getItem('token') as string;
            this.loginService.userIsAuth = true;
            this.loginService.userToken = token;
            // Rediriger l'utilisateur vers la page d'accueil ou une page protégée
            this.router.navigate(['/']);
          } else {
            // Afficher un message d'erreur
            console.error(response.error);
            this.addErrorMessage(response.error);
          }
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

  ngOnInit(): void {
    
  }

}
