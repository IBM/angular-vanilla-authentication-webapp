import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) { }
  userData: any; 
  loading = false;

  ngOnInit(): void {
    let userId = localStorage.getItem('loggedInUser') || '';
    this.userService.getUser(userId).subscribe(
      (data: any)=>{
        this.userData = data
      },
      (error)=>{
        this.loading = false;
        alert(error.error.errMessage);
      }
    )
  }

}
