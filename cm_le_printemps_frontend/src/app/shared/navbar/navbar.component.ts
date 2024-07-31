import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public router:Router){}

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
