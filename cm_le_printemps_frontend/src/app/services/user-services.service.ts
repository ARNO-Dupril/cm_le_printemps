import { Injectable } from '@angular/core';

interface User {
  IsAuth: boolean,
  Token: string,
  Role: number,
  Email: string,
  name: string,
  Id: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  public user: User | undefined;
  constructor() { }
}
