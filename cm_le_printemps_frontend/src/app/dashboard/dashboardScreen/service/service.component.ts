/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../../services/service/service.service';
import { AuthService } from '../../../services/server/auth.service';

interface ErrorMessage {
  message: string;
  showMessage: boolean;
  error: boolean;
}

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {
  serviceForm: FormGroup;
  editForm: FormGroup;
  userId: string = "";
  errorMessages: ErrorMessage[] = [];
  idService: number = 0;
  serviceNom = "";
  dataToEdit: any;

  items: number[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  itemsToDisplay: number[] = [];
  pages: number[] = [];
  nbr: number = 20;

  isToggled: boolean = false;

  isActive: boolean = true;
  changeIsActive(state: boolean){
    this.isActive = state;
  }

  imageUrl: string | null = null;
  image: File | null = null;
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.readFile(file);
      this.image = file;
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      
    };
    reader.readAsDataURL(file);
  }

  editOpen: boolean = false;
  closeEdit(){
    this.editOpen = !this.editOpen;
  }

  formOpen: boolean = false;
  closeForm(){
    this.formOpen = !this.formOpen;
  }

  deleteOpen: boolean = false;
  idToDelete: string = "";
  closeDelete(){
    this.deleteOpen = false;
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public service: ServiceService){
    
    this.serviceForm = this.formBuilder.group({
      code: ['', Validators.required],
      nom: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      actif: [false]
    });

    this.editForm = this.formBuilder.group({
      code: ['', Validators.required],
      nom: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      actif: [false]
    });
  }

  ngOnInit() {
    this.userId = this.authService.userId;
    this.initForm();
    // this.loadServices();
    this.service.loadServices();
    console.log('User ID:', this.userId);
    this.generateItems();
    this.updateDisplayedItems();
    this.generatePagination();
  }

  initForm() {
    this.serviceForm = this.formBuilder.group({
      code: ['', Validators.required],
      nom: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });

    this.editForm = this.formBuilder.group({
      code: ['', Validators.required],
      nom: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  loadDetails(id: number){
    this.idService = id;
  }

  delete(id: string){
    this.idToDelete = id;
    this.deleteOpen = true;
  }

  deleteService(yes: boolean){
    if (yes) {
      const response = this.service.deleteService(this.idToDelete);
      response.then(data => {
        if(data.ok){
          this.service.loadServices();
          this.addSuccessMessage("service supprimé avec succes!!");
          this.reload();
        }else{
          this.addErrorMessage("le service n'a pas ete supprimé!!");
        }
      }).catch(err => {
        console.log("une erreur est survenue: ", err);
        throw err;
      })
      this.closeDelete();
    } else {
      this.closeDelete();
    }
  }

  updateService(id: string){
    this.getService(id);
  }

  getService(id: string){
    this.service.getServiceById(id)
    .then(response => response.json())
    .then(data => {
      this.dataToEdit = data;
      
      this.editForm = this.formBuilder.group({
        code: [this.dataToEdit.code, Validators.required],
        nom: [this.dataToEdit.nom, Validators.required],
        description: [this.dataToEdit.description, Validators.required],
        image: [this.fetchAndConvertImage(`http://localhost:4500/${this.dataToEdit.image}`), Validators.required]
      });
      
      this.isActive = this.dataToEdit.actif;
      this.editOpen  = true;
    })
    .catch(error => console.log("une erreur est survenu: ", error));
  }

  async fetchAndConvertImage(url: string) {
    const imageUrl = url;
    this.imageUrl = imageUrl;
    const blob = await this.service.fetchImage(imageUrl);
    const file = this.service.convertBlobToFile(blob, 'editedService.png');
    console.log(file);
    return file;
  }

  reload(){
    window.location.reload();
  }

  generateItems() {
    this.items = Array.from({ length: this.nbr }, (_, i) => i + 1);
  }

  updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.itemsToDisplay = this.items.slice(startIndex, endIndex);
  }

  generatePagination() {
    const totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedItems();
  }

  // onSubmit() {
  //   const formData = new FormData();
  //   const imageControl = this.serviceForm.get('image');
  //   if (imageControl && imageControl.value instanceof File) {
  //     formData.append('image', imageControl.value);
  //   }
  //   formData.append('code', this.serviceForm.get('code')!.value.toString());
  //   formData.append('nom', this.serviceForm.get('nom')!.value.toString());
  //   formData.append('description', this.serviceForm.get('description')!.value.toString());
  //   formData.append('actif', this.isActive.toString());
  //   formData.append('userId', this.userId.toString());
  
  //   console.log(formData.get('image'));
  
  //   this.service.addService(formData).then(data => {
  //     console.log('====================================');
  //     console.log("service ajouté avec succes:: ", data);
  //     console.log('====================================');
  //   }).catch(err => {
  //     console.log("une erreur s'est produite:: ", err);
  //     throw err;
  //   });
  // }

  onSubmit(){
    this.errorMessages = [];

    if (this.serviceForm.invalid) {
      if (this.serviceForm.get('code')?.invalid) {
        this.addErrorMessage('veillez entrer un code valide s\'il vous plait!!.');
      }
      if (this.serviceForm.get('nom')?.invalid) {
        this.addErrorMessage('Veillez entrer un nom valide (8 caracteres au minimum).');
      }
    } else {
      // Traiter le formulaire valide ici
      try {
        console.log('Form submitted:', this.serviceForm.value);
        const formData  = {
          code: this.serviceForm.get('code')?.value,
          nom: this.serviceForm.get('nom')?.value,
          description: this.serviceForm.get('description')?.value,
          actif: this.isActive,
          image: this.image,
          userId: this.userId.toString()
        }
        this.service
        .addService(formData)
        .then(response => {
          this.addSuccessMessage("service ajouté avec succes");
          console.log(response.newService);
          this.serviceForm.reset();
          this.image = null;
          this.reload();
        })
      } catch (error) {
        console.error(error);
        // Afficher un message d'erreur
        this.addSuccessMessage('Une erreur s\'est produite!!  \n Veillez reessayer!!');
      }
    }
  }

  onEdit(){
    this.errorMessages = [];

    if (this.editForm.invalid) {
      if (this.editForm.get('code')?.invalid) {
        this.addErrorMessage('veillez entrer un code valide s\'il vous plait!!.');
      }
      if (this.editForm.get('nom')?.invalid) {
        this.addErrorMessage('Veillez entrer un nom valide (8 caracteres au minimum).');
      }
    } else {
      // Traiter le formulaire valide ici
      try {
        console.log('Form submitted:', this.editForm.value);
        const formData  = {
          code: this.editForm.get('code')?.value,
          nom: this.editForm.get('nom')?.value,
          description: this.editForm.get('description')?.value,
          actif: this.isActive,
          image: this.image,
          userId: this.userId.toString()
        }
        this.service
        .update(this.dataToEdit._id, formData)
        .then(response => {
          this.addSuccessMessage("service modiié avec succes");
          console.log(response);
          this.editForm.reset();
          this.image = null;
          this.reload();
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
