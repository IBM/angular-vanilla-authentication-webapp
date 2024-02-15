import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

    constructor(
      private userService: UserService,
      private router: Router,
    ) { }
    userData: any; 
    loading = false;
    loggedInEmail = localStorage.getItem('email')
    header = [
      {
        config: 'UserId'
      },
      {
        config: 'FirstName'
      },
      {
        config: 'LastName'
      },
      {
        config: 'EmailId'
      },
      {
        config: 'Role'
      },
      {
        config: 'Actions'
      },
    ]
  
    ngOnInit(): void {
      let userRole = localStorage.getItem('role') || '';
      let userEmail = localStorage.getItem('email') || '';

      this.userService.getAllUser(userRole, userEmail).subscribe(
        (data: any)=>{
          this.userData = data
        },
        (error)=>{
          this.loading = false;
          alert(error.error.errMessage);
        }
      )
    }

    onPasswordChange(){
      this.router.navigateByUrl('/change-password');
    }
  
  }

