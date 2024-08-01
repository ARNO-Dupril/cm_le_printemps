import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeServiceService } from '../../services/home-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  services: HomeServiceService = new HomeServiceService();
  listeService: any = this.services.listeService;
}
