import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/server/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(public router:Router, public authService: AuthService){  }

  menuVariable:boolean = false;
  xlg:boolean = this.menuVariable;

  openMenu(){
    this.menuVariable = !this.menuVariable;
    this.xlg = this.menuVariable;
  }

  closeMenu():void{
    this.menuVariable ? this.openMenu() : null;
    
  }
}
