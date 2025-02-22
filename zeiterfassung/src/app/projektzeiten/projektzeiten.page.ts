import { Component } from '@angular/core';

@Component({
  selector: 'app-projektzeiten',
  templateUrl: './projektzeiten.page.html',
  styleUrls: ['./projektzeiten.page.scss'],
  standalone: false,
})
export class ProjektzeitenPage {
  projects = [
    { name: "Projekt in Höchst", dateStart: "24/01/2025 - 5:27", dateEnd: "24/01/2025 - 15:06", duration: "9:39 Stunden" },
    { name: "Projekt in Isenburg", dateStart: "24/01/2025 - 5:27", dateEnd: "24/01/2025 - 15:06", duration: "9:39 Stunden" },
    { name: "Projekt in Mainz", dateStart: "24/01/2025 - 5:27", dateEnd: "24/01/2025 - 15:06", duration: "9:39 Stunden" }
  ];
  
  projectCount: number = this.projects.length;

  months: string[] = ["Januar 2025", "Februar 2025", "März 2025", "April 2025"];
  selectedMonth: string = "Januar 2025";

  onMonthChange(event: CustomEvent) {
    if (event.detail && event.detail.value) {
      console.log("Neuer Monat ausgewählt:", event.detail.value);
      this.selectedMonth = event.detail.value;
    }
  }
}
