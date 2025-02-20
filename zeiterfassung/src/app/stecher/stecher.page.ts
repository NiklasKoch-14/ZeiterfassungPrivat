import {Component} from '@angular/core';
import {Timesheet} from "../api/models/timesheet";
import {Type} from "../api/models/type";
import {Project} from "../api/models/project";
import {DatePipe} from "@angular/common";
import {ModalController} from "@ionic/angular";
import {ModalComponent} from "../modal/modal.component";


@Component({
  selector: 'app-stecher',
  templateUrl: 'stecher.page.html',
  styleUrls: ['./stecher.page.scss'],
  standalone: false,
})
export class StecherPage {

  constructor(private datePipe: DatePipe, private modalCtrl: ModalController) {
  }

  currentTimesheet: Timesheet | undefined;
  currentProject: Project | undefined;

  isRunning: boolean = false;
  public time: string = '00:00:00';
  private interval: any;
  private seconds: number = 0;

  ngOnInit(): void {
    this.initTimesheet();
    this.initProject();
  }

  setTime(): string {
    return this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ssZ')!;
  }

  startTimer(): void {
    if (this.interval) {
      return;
    }
    this.interval = setInterval(() => {
      this.seconds++;
      const hours = Math.floor(this.seconds / 3600);
      const minutes = Math.floor((this.seconds % 3600) / 60);
      const remainingSeconds = this.seconds % 60;
      this.time = this.formatTime(hours, minutes, remainingSeconds);
    }, 1000);

    if (!this.currentTimesheet!.startTime) {
      this.currentTimesheet!.startTime = this.setTime();
      console.log(this.currentTimesheet!);
      return;
    }
    this.pushTimesheet()
  }

  stopTimer(): void {
    clearInterval(this.interval);
    this.interval = null;
    this.currentTimesheet!.endTime = this.setTime();
    console.log(this.currentTimesheet!);
    this.pushTimesheet();
  }

  pushTimesheet(): void {
    console.log('Pushing Timesheet');
    this.currentTimesheet = this.initTimesheet()
    this.currentProject = this.initProject();
    console.log("NEW Timesheet");
  }

  initTimesheet(): Timesheet | undefined {
    return this.currentTimesheet = {
      employeeId: 1,
      projectId: 1,
      type: undefined,
      startTime: undefined,
      endTime: undefined,
    };
  }

  initProject(): Project | undefined {
    return this.currentProject = {
      name:"Project3",
      projectId:3,
      ort:"xheeh"
    }
  }

  // resetTimer(): void {
  //   clearInterval(this.interval);
  //   this.interval = null;
  //   this.seconds = 0;
  //   this.time = '00:00:00';
  // }

  private formatTime(hours: number, minutes: number, seconds: number): string {
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  private startRunning(): void {
    this.isRunning = true;
    this.startTimer()
  }

  protected Type=Type;

  startStopPressed(pressedtype: string): void {
    switch (pressedtype) {
      case 'Arbeitszeit':
        if(!this.isRunning) {
          console.log("!running")
          this.currentTimesheet!.type = Type.Arbeitszeit;
          this.startRunning()
        } else {
          console.log("else running")
          if(this.currentTimesheet!.type === Type.Arbeitszeit) {
            console.log("else running sametype")
            this.stopTimer();
            this.isRunning = false;
          } else {
            console.log("else running diff type")
            this.stopTimer();
            this.currentTimesheet!.type = Type.Arbeitszeit;
            this.startRunning();
          }
        }
        break;
      case 'Pausenzeit':
        if(!this.isRunning) {
          this.currentTimesheet!.type = Type.Pausenzeit;
          this.startRunning();
        } else {
          if(this.currentTimesheet!.type === Type.Pausenzeit) {
            this.stopTimer();
            this.isRunning = false;
          } else {
            this.stopTimer();
            this.currentTimesheet!.type = Type.Pausenzeit;
            this.startRunning();
          }
        }
        break;
      case 'Fahrtzeit':
        if(!this.isRunning) {
          this.currentTimesheet!.type = Type.Fahrtzeit;
          this.startRunning();
        } else {
          if(this.currentTimesheet!.type === Type.Fahrtzeit) {
            this.stopTimer();
            this.isRunning = false;
          } else {
            this.stopTimer();
            this.currentTimesheet!.type = Type.Fahrtzeit;
            this.startRunning();
          }
        }
        break;
        default:
          console.log(`Invalid pressedtype ${pressedtype}`);
          break;
    }
  }

  isState(state: string): boolean {
    return this.isRunning && this.currentTimesheet?.type?.valueOf() === state
  }

  //openmodal
  async openModal(project: Project | undefined) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { insertedProject: project }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.currentProject = data as Project;
    }
  }
}
