import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(){}

  menuVariable:boolean = false;
  xlg:boolean = this.menuVariable;

  openMenu(){
    console.log("old: ", this.menuVariable);
    this.menuVariable = !this.menuVariable;
    this.xlg = this.menuVariable;
  }
}
