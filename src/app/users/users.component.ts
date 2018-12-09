import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiHitsService } from '../api-hits.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users = [];
  public isLoading = false;
  modalRef: BsModalRef;
  public userObject = {};
  public alerts = [];

  constructor(private api: ApiHitsService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    window.scrollTo(0, 0);
    this.isLoading = true;
    this.api.getUsers().subscribe(res => {
      this.isLoading = false;
      this.users = res['users'];
    }, err => {
      this.isLoading = false;
      this.users = [];
      this.addErrorAlert(err, 'danger');
    });
  }

  viewFile(template: TemplateRef<any>, user) {
    this.isLoading = true;
    this.api.getUser(user).subscribe(res => {
      this.isLoading = false;
      this.userObject = res;
      this.modalRef = this.modalService.show(template);
    }, err => {
      this.getUsers();
      this.addErrorAlert(err, 'danger');
    });
  }

  deleteFile(user) {
    this.isLoading = true;
    this.alerts = [];
    this.api.deleteUser(user).subscribe(res => {
      this.add('User successfully deleted', 'info');
      this.getUsers();
    }, err => {
      this.addErrorAlert(err, 'danger');
      this.getUsers();
    });
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

}
