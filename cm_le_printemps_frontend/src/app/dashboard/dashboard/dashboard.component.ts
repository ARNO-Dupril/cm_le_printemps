import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../services/service/service.service';
import { AuthService } from '../../services/server/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  id: string = "";

  constructor(private authService: AuthService, private route: ActivatedRoute,public router: Router, public service: ServiceService){
    this.getIdFronRoutes();
    this.getUser();
  }
  
  menuVariable:boolean = false;
  disconnect: boolean = false;

  onDisconnect(){
    this.disconnect = !this.disconnect;
  }

  openMenu(){
    this.menuVariable = !this.menuVariable;
  }

  closeMenu():void{
    this.menuVariable ? this.openMenu() : null;
  }

  getUser(){

    if (this.id == this.authService.userId) {
      this.service.findUserById(this.id)
      .then(response => {
        if (response.message) {
          this.service.user = response.user;;
        } else {
          console.log('====================================');
          console.log(response.message);
          console.log('====================================');
        }
      }).catch(err => {
        this.router.navigate(['/']);
        throw err;
      })
    } else {
      this.router.navigate(['/sorry']);
    }
  }

  getIdFronRoutes(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
