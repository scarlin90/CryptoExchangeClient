import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user: User;
  isStored: boolean;

  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.user = {username: '', password: ''};
   }

  ngOnInit() {
  }

  authenticate() {
    this.localStorageService.set('auth', this.user)
    .subscribe(
      (isStored) => {
        this.isStored = isStored;

        if (this.user.username == "tester" && this.user.password == "tester") {
          this.router.navigate(['/dashboard']);

        }
      },
      err => { console.log(err); });
  }

}
