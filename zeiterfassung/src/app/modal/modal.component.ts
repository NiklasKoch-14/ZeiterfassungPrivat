import {Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonButtons,
  IonContent, IonFab, IonFabButton,
  IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent,
  IonItem, IonLabel, IonList,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import {Project} from "../api/models/project";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {NgClass, NgIf} from "@angular/common";
import {ModalDetailComponent} from "../modaldetail/modaldetail.component";

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  providers: [ModalController],
  imports: [FormsModule, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonTitle, IonToolbar, IonLabel, IonInfiniteScrollContent, IonInfiniteScroll, IonList, NgIf, NgClass, IonIcon, IonFab, IonFabButton],
})
export class ModalComponent {

  @Input("insertedProject") insertedProject: Project | undefined;

  projectList: Project[] = [
    {name:"Project1", projectId:1, ort:"Hoechst"},
    {name:"Project2", projectId:2, ort:"Bubatz"},
    {name:"Project3", projectId:3, ort:"xheeh"},
  ];

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  selectProject(project: Project) {
    console.log("pressed selectProject")
    return this.modalCtrl.dismiss(project, 'confirm');
  }

  //openmodal
  async openModalDetail(project?: Project) {
    const modal = await this.modalCtrl.create({
      component: ModalDetailComponent,
      componentProps: { insertedDetailProject: project }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'newProject') {
      //todo needs to do a push to get an Id
      this.projectList.push(data as Project);
    } else if (role === 'updatedProject') {
      this.insertedProject = data as Project;
      this.projectList = this.removeProjectById(this.projectList, this.insertedProject.projectId!);
      this.projectList.push(this.insertedProject);
    }
  }

  removeProjectById = (projectList: Project[], projectIdToRemove: number): Project[] => {
    return projectList.filter(project => project.projectId !== projectIdToRemove);
  };

}
