import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  listeService:any = [
    {
      id: 1,
      nom: "Programme de vaccination",
      description: "Protection contre les infections courantes grâce à nos vaccinations.",
      image: "b5fc40d9a9f57e150495f11ac152c5d5.jpg"
    },
    {
      id: 2,
      nom: "Vaccin pour enfant",
      description: "ProteProtégez votre famille grâce à notre programme de vaccination.",
      image: "a6896784bc341baee8c44a375bd4e6f2.jpg"
    },
    {
      id: 3,
      nom: "Suivis de grossesse",
      description: "Accompagnement médical complet pendant votre grossesse.",
      image: "0f62f1246f6cba360e54d44cc0317c53.jpg"
    },
    {
      id: 4,
      nom: "Bilan de santé complet",
      description: "Évaluation approfondie de votre état de santé global.",
      image: "88c52a5aad21cad258e2f32513a82938.jpg"
    }
  ]
  constructor() { }
}
