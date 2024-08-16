import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup, FormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-commentaire',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, 
    RouterModule
  ],
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})
export class CommentaireComponent {

  commentForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.commentForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });
  }

}
