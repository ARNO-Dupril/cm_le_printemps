import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  items: number[] = [];
  itemsPerPage = 6;
  currentPage = 1;
  itemsToDisplay: number[] = [];
  pages: number[] = [];
  nbr: number = 20;

  ngOnInit() {
    this.generateItems();
    this.updateDisplayedItems();
    this.generatePagination();
  }

  generateItems() {
    this.items = Array.from({ length: this.nbr }, (_, i) => i + 1);
  }

  updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.itemsToDisplay = this.items.slice(startIndex, endIndex);
  }

  generatePagination() {
    const totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedItems();
  }

}
