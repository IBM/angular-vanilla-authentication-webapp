import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
 
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  get fval() { return this.loginForm.controls; }
  
  onFormSubmit(){
    this.submitted = true;
    // return for here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.login(this.loginForm.value).subscribe(
      (data: any)=>{
        alert('User LoggedIn successfully!!');
        localStorage.setItem("loggedInUser", data._id);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);
        this.router.navigateByUrl('/dashboard');
        window.location.reload();
      },
      (error)=>{
        this.loading = false;
        alert(error.error.errMessage);
      }
      )
  }
 
}

