import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [LocalStorageService]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
