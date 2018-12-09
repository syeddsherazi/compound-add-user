import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiHitsService {

  
  constructor(private http: HttpClient) { }

  addUser(model){
    return this.http.post('https://6r02x43nni.execute-api.ap-south-1.amazonaws.com/AddUserStage/add-user',model);
  }

  getUsers(){
    return this.http.get('https://6r02x43nni.execute-api.ap-south-1.amazonaws.com/AddUserStage/get-users');
  }

  getUser(email){
    return this.http.get('https://6r02x43nni.execute-api.ap-south-1.amazonaws.com/AddUserStage/get-user?emailAddress='+email);
  }

  deleteUser(email){
    return this.http.delete('https://6r02x43nni.execute-api.ap-south-1.amazonaws.com/AddUserStage/delete-user?emailAddress='+email);
  }
}
