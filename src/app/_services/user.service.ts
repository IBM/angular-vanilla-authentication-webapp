import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`/user`, user);
  }

  login(user: any) {
    return this.http.post(`/user/login`, user);
  }

  getUser(userId: string) {
    return this.http.get(`/user/${userId}`);
  }

  getAllUser(role: string, email: string) {
    return this.http.get(`/user/${role}/${email}`);
  }

  getQuestions(email: string) {
    return this.http.post(`/user/questions`, {email});
  }

  updatePassword(user: any) {
    return this.http.post(`/user/update-password`, user);
  }

  changePassword(user: any) {
    return this.http.post(`/user/change-password`, user);
  }
 
}