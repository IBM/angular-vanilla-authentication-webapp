import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
    ) { }
    passwordForm!: FormGroup;
    loading = false;
    submitted = false;
  
    ngOnInit() {

      this.passwordForm = this.formBuilder.group({
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      });
     
    }
    
    get fval() { return this.passwordForm.controls; }

    
    onFormSubmit(){
      this.submitted = true;
      // return for here if form is invalid
      if (this.passwordForm.invalid) {
        return;
      }
      this.loading = true;
      let formData = {...this.passwordForm.value, email: localStorage.getItem('email')}
      this.userService.changePassword(formData).subscribe(
        (data)=>{
          alert('Password changed successfully!!');
          this.router.navigateByUrl('/');
        },
        (error)=>{
          this.loading = false;
          alert(error.error.errMessage);
        }
      )
    }
   
  }

