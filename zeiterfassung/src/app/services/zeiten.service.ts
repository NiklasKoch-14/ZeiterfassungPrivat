import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../api/models/employee";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Timesheet} from "../api/models/timesheet";

@Injectable({
  providedIn: 'root',
})
export class ZeitenService {
  private apiUrl = 'http://localhost:8080/zeiten';
  private _postResponse: any;

  constructor(private http: HttpClient) {
  }

  zeitenPost(timesheet: Timesheet | undefined): Observable<any>{
    return this.http.post(`${this.apiUrl}`, timesheet).pipe(
      tap((r) => {this._postResponse = r})
    )
  }
}
