import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

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
}
