import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from '../../../environments/environment';
import { UserServicesService } from '../user-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper: JwtHelperService = new JwtHelperService;

  public userIsAuth: boolean = false;
  public userToken: string = "";
  public userRole: number = -1 ;
  public userEmail: string = "";
  public username: string = "";
  public userId: string = "";

  constructor(private user: UserServicesService){}

  async login(email: string, password: string): Promise<any> {
    return await fetch(`${environment.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Erreur lors de la connexion :', error);
      throw error;
    });
  }

  async signup(formData: {
    email: string;
    telephone: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    const response = await fetch(`${environment.apiUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    return await response.json();
  }

  verifyAuth():void{
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.userIsAuth = true;
      // this.user.user.IsAuth = true;
      this.userToken = token
      // this.user.user.Token = token;
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userId = decodedToken._id;
      // this.user.user.Id = decodedToken._id;
      this.userRole = decodedToken.role;
      // this.user.user.Role = decodedToken.role;
      this.userEmail = decodedToken.email;
      // this.user.user.Email = decodedToken.email;
      this.username = decodedToken.username;
      // this.user.user.name = decodedToken.username;
    } else {
      this.userIsAuth = false;
      this.userId = "";
      this.userRole = -1;
      this.userEmail = "";
      this.username = "";
    }
    // console.log('====================================');
    // console.log({"token": localStorage.getItem('token'), "username": this.username, "role": this.userRole});
    // console.log('====================================');
  }

}
