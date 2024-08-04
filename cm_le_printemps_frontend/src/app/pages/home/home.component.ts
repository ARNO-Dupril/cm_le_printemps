import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
 
  constructor(
    public homeService: HomeServiceService
  ){ 
    
   }

  ngOnInit(): void {
    
  }

}
