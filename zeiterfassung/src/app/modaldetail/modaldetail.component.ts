import {Component, Input, OnInit} from "@angular/core";
import {Project} from "../api/models/project";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-modaldetail',
  templateUrl: 'modaldetail.component.html',
  imports: [
    IonButton,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonInput,
    FormsModule,
  ],
  providers: [ModalController],
  styleUrls: ['modaldetail.component.scss']
})
export class ModalDetailComponent implements OnInit {

  @Input("insertedDetailProject") insertedDetailProject: Project | undefined;

  createdProjectForm: Project;

  constructor(private modalCtrl: ModalController) {
    this.createdProjectForm = {name: "", projectId: undefined, ort: ""};
  }

  ngOnInit(): void {
    console.log('Inserted detail project ', this.insertedDetailProject);
    if(this.insertedDetailProject){
      this.createdProjectForm = this.insertedDetailProject;
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSave() {
    console.log("return ", this.createdProjectForm)
    if(this.createdProjectForm.projectId){
      return this.modalCtrl.dismiss(this.createdProjectForm, 'updatedProject');
    }
    return this.modalCtrl.dismiss(this.createdProjectForm, 'newProject');
  }

}
