/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface User {
  _id: string;
  nom?: string;                // Non obligatoire, max 25 caractères
  prenom?: string;            // Non obligatoire, max 25 caractères
  username: string;           // Obligatoire, max 32 caractères
  email: string;              // Obligatoire, unique, suit un format spécifique
  password: string;           // Obligatoire
  userRole: UserRole;        // Obligatoire, enum : -1, 0, 1
  telephone?: number;         // Non obligatoire, unique, 9 chiffres
  profil?: string;            // Non obligatoire, default "uploads/users/user.png"
  verified?: boolean;         // Non obligatoire, default false
  secretKey?: string | null;  // Non obligatoire
  history?: any[];            // Non obligatoire, default []
  createdAt?: Date;           // Timestamp
  updatedAt?: Date;           // Timestamp
}

export enum UserRole {
  Admin = 1,
  User = 0,
  Banned = -1,
}

export interface Service {
  _id: string;
  code: string;                // Obligatoire, max 10 caractères
  nom: string;                 // Obligatoire, max 25 caractères
  description: string;         // Obligatoire
  actif: boolean;              // Obligatoire, default true
  image: string;               // Obligatoire
  userId: User;           // Obligatoire, référence à "users"
  createdAt?: Date;           // Timestamp
  updatedAt?: Date;           // Timestamp
}

export interface Commentaire {
  _id?: string;             // ID unique généré automatiquement
  sujet: string;              // Obligatoire, max 25 caractères
  contenu: string;            // Obligatoire, max 32 caractères
  userId: User;          // Obligatoire, référence à "users"
  createdAt?: Date;           // Timestamp optionnel
  updatedAt?: Date;           // Timestamp optionnel
}

export interface RendezVous {
  _id?: string;              // ID unique généré automatiquement
  nom: string;                 // Obligatoire, max 25 caractères
  prenom: string;              // Obligatoire, max 25 caractères
  age: AgeGroup;              // Obligatoire, par défaut 'adolescent'
  sexe: Sexe;
  description: string;                  // Obligatoire, par défaut 'masculin'
  serviceId: Service;        // Obligatoire, référence à "service"
  createdAt?: Date;           // Timestamp optionnel
  updatedAt?: Date;           // Timestamp optionnel
}

export enum AgeGroup {
  Bebe = 'bebe',
  Enfant = 'enfant',
  Adolescent = 'adolescent',
  Adulte = 'adulte',
}

export enum Sexe {
  Masculin = 'masculin',
  Feminin = 'feminin',
}

export interface Demande {
  _id?: string;              // ID unique généré automatiquement
  code: string;                // Obligatoire
  date: Date;                  // Obligatoire
  statut: DemandeStatut;      // Obligatoire, par défaut 'attente'
  rdvId: RendezVous;            // Obligatoire, référence à "rendezVous"
  userId: User;           // Obligatoire, référence à "users"
  createdAt?: Date;           // Timestamp optionnel
  updatedAt?: Date;           // Timestamp optionnel
}

export enum DemandeStatut {
  Attente = 'attente',
  Confirme = 'confirmé',
  Annule = 'annulé',
  // Reporte = 'reporté',
}

export interface Contact {
  _id?: string;               // ID unique généré automatiquement
  nom: string;                // Obligatoire, max 25 caractères
  theme: string;              // Obligatoire, max 25 caractères
  contenu: string;            // Obligatoire, max 32 caractères
  email: string;              // Obligatoire, unique, suit un format spécifique
  createdAt?: Date;           // Timestamp optionnel
  updatedAt?: Date;           // Timestamp optionnel
}

export interface NewsLetter {
  _id?: string;               // ID unique généré automatiquement
  email: string;              // Obligatoire, unique, suit un format spécifique
  createdAt?: Date;           // Timestamp optionnel
  updatedAt?: Date;           // Timestamp optionnel
}


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  users: User[] = [];
  services: Service[] = [];
  // serviceToDisplay: service[] = [];
  rdv: RendezVous[] = [];
  demandes: Demande[] = [];
  contacts: Contact[] = [];

  user: any;

  constructor() { }

  generateUniqueCode(): string {
    const now = new Date();
    
    // Obtention des parties de la date et de l'heure
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Mois avec zéro devant
    const day = now.getDate().toString().padStart(2, '0'); // Jour avec zéro devant
    const hours = now.getHours().toString().padStart(2, '0'); // Heures avec zéro devant
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Minutes avec zéro devant
    const seconds = now.getSeconds().toString().padStart(2, '0'); // Secondes avec zéro devant
    const milliseconds = now.getMilliseconds(); // Millisecondes
  
    // Générer un code unique en combinant les éléments
    const code = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    
    return code;
  }

  // getServices(page: number, itemsPerPage: number): service[] {
  //   const startIndex = (page - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return this.services.slice(startIndex, endIndex);
  // }

  // getTotalServices(): number {
  //   return this.services.length;
  // }




  async fetchImage(url: string): Promise<Blob> {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  }

  convertBlobToFile(blob: Blob, fileName: string): File {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }
  
  

  //#region newsletter
  async addNewsletter( email: string ) {
      const response = await fetch(`${environment.apiUrl}/newsletters/add-newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
    return await response.json();
  }
//#endregion

// #region users
  loadUsers(){
    if (this.users.length <= 0) {
      return this.getAllUsers()
      .then(data => {
        if(data.success){
          this.users = data.users;
        }
      })
      .catch(error => console.log("une erreur est survenu(users): ", error));
    }
    return ;
  }

  async findUserById(id: string){

    const response = await fetch(`${environment.apiUrl}/user/single-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: id})
    });

    return await response.json();
  }

  async getAllUsers(): Promise <any>{
    try {
      const response = await fetch(`${environment.apiUrl}/user/all-users`);
      return await response.json();
    } catch (error) {
      console.log('une erreur est survenu dans le service de recuperation: ', error);
      throw error;
    }
  }

  async addUser(formData: any): Promise <any> {
    // Créer un FormData à partir des données du formulaire
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });
    try {
      const response = await fetch(`${environment.apiUrl}/user/add-users`, {
        method: 'POST',
        body: formDataToSubmit
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Erreur lors de la soumission du formulaire : ${response}`);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      throw error;
    }
  }

  deleteUser(formData: FormData){
    const response = fetch(`${environment.apiUrl}/user/del-user`, {
      method: 'POST',
      body: formData
    });
    return response;
  }

  async updateUser(formData: any): Promise <any>{
    // Créer un FormData à partir des données du formulaire
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${environment.apiUrl}/user/edit-user`, {
        method: 'POST',
        body: formDataToSubmit
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Erreur lors de la soumission du formulaire : ${response}`);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      throw error;
    }
  }

  //#endregion

  //#region services
  async addService(formData: any): Promise <any> {
    // Créer un FormData à partir des données du formulaire
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${environment.apiUrl}/services/add-service`, {
        method: 'POST',
        body: formDataToSubmit
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Erreur lors de la soumission du formulaire : ${response}`);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      throw error;
    }
  }

  async getAllServices(): Promise <any>{
    try {
      const response = await fetch(`${environment.apiUrl}/services`);
      return await response.json();
    } catch (error) {
      console.log('une erreur est survenu dans le service de recuperation: ', error);
      throw error;
    }
  }

  deleteService(id: string){
    const response = fetch(`${environment.apiUrl}/services/delete-service/${id}`, {
      method: 'DELETE'
    });
    return response;
  }

  async update(id: string, formData: any): Promise <any>{
    // Créer un FormData à partir des données du formulaire
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${environment.apiUrl}/services/update-service/${id}`, {
        method: 'PUT',
        body: formDataToSubmit
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Erreur lors de la soumission du formulaire : ${response}`);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      throw error;
    }
  }

  async getServiceById(id: string): Promise<any>{

    try {
      const response = await fetch(`${environment.apiUrl}/services/${id}`);
      console.log(response);
      
      return await response;
    } catch (error) {
      console.log('une erreur est survenu dans le service de recuperation: ', error);
      throw error;
    }
  }

  loadServices(){
    if (this.services.length <= 0) {
      return this.getAllServices()
      .then(data => {
        if(data.length > 0){
          this.services = data;
        }
      })
      .catch(error => console.log("une erreur est survenu: ", error));
    }
    return ;
  }

  //#endregion

//#region rdv

// async createRdv(formData: any): Promise<any>{
//   // Créer un FormData à partir des données du formulaire
//   const formDataToSubmit = new FormData();
//   Object.keys(formData).forEach(key => {
//     formDataToSubmit.append(key, formData[key]);
//   });

//   try {
//     const response = await fetch(`${environment.apiUrl}/create/create-rdv`, {
//       method: 'POST',
//       body: formDataToSubmit
//     });
//     console.log(response);
//     if (response.ok) {
//       return await response.json();
//     } else {
//       throw new Error(`Erreur lors de la soumission du formulaire : ${response}`);
//     }
//   } catch (error) {
//     console.error('Erreur lors de la soumission du formulaire :', error);
//     throw error;
//   }
// }

async createRdv(formData: any): Promise<any> {
  try {
    const response = await fetch(`${environment.apiUrl}/create/create-rdv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Assurez-vous d'envoyer des JSON
      },
      body: JSON.stringify(formData) // Conversion en JSON
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json(); // Obtenez les détails de l'erreur
      throw new Error(`Erreur lors de la soumission du formulaire : ${response.status} ${errorData.message}`);
    }
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire :', error);
    throw error;
  }
}

//#endregion



  
}
