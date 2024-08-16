import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ServiceService } from '../../../services/service/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './dash-home.component.html',
  styleUrl: './dash-home.component.css'
})
export class DashHomeComponent{

  id: string = "";
i: any;

  constructor(public service: ServiceService, private route: ActivatedRoute){ 
    this.getIdFronRoutes();
   }

  // loadId(): string{
  //   return this.service.user._id;
  // }

  
  getIdFronRoutes(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
