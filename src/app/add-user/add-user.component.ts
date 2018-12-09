import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiHitsService } from '../api-hits.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public user = new User();
  public alerts = [];
  public isAddingUser = false;
  public validEmail = true;
  constructor(private api: ApiHitsService) { }

  ngOnInit() {
  }

  public submit(captchaResponse: string, ref): void {
    this.alerts = [];
    this.isAddingUser = true;
    this.user.recaptchaToken = captchaResponse;
    ref.reset();
    this.api.addUser(this.user).subscribe(res => {
      this.user.reset();
      this.isAddingUser = false;
      this.add('User successfully added', 'info');
    }, err => {
      this.isAddingUser = false;
      this.addErrorAlert(err, 'danger');
    })
  }

  addErrorAlert(err, type): void {
    if (err && err.error && err.error.errorMessage) {
      this.add(err.error.errorMessage, type);
    } else {
      this.add('Something bad occured', type);
    }
  }

  add(message, type): void {
    this.alerts.push({
      type: type,
      msg: message,
      timeout: 5000
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onEmailChange(newValue) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!newValue || validEmailRegEx.test(newValue)) {
        this.validEmail = true;
    }else {
      this.validEmail = false;
    }

  }
}

class User {
  public firstName;
  public lastName;
  public emailAddress;
  public recaptchaToken;

  constructor() {
    this.reset();
  }

  reset() {
    this.firstName = '';
    this.lastName = '';
    this.emailAddress = '';
    this.recaptchaToken = true;
  }
}