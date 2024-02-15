import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
    ) { }
    passwordForm!: FormGroup;
    emailForm!: FormGroup;
    loading = false;
    submitted = false;
    questions : any
    nextEnable = false;
    nextSubmitted = false
  
    ngOnInit() {

      this.emailForm = this.formBuilder.group({
        email: ['', [Validators.required,Validators.email]],
      });

      this.passwordForm = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        answer1: ['', Validators.required],
        answer2: ['', Validators.required],
      });
     
    }
    
    get fval() { return this.passwordForm.controls; }
    get eval() { return this.emailForm.controls; }

    onNext() {
      const { email } = this.emailForm.value;
      this.nextSubmitted = true;
      if (this.emailForm.invalid) {
        return;
      }
      this.userService.getQuestions(email).subscribe(
        (data: any)=>{
          this.questions = data.data;
          this.nextEnable = true
        },
        (error)=>{
          this.loading = false;
          alert(error.error.errMessage);
        }
      )
    }

    
    onFormSubmit(){
      const { answer1, answer2 } = this.passwordForm.value;
      const { email } = this.emailForm.value;
      this.submitted = true;
      // return for here if form is invalid
      if (this.passwordForm.invalid) {
        return;
      }
      this.loading = true;
      let questionsArr = [
        {
          ...this.questions[0], answer: answer1 
        }, 
        {
          ...this.questions[1], answer: answer2 
        }]
      let formData = {...this.passwordForm.value, questionsArr, email }
      this.userService.updatePassword(formData).subscribe(
        (data)=>{
          alert('Password updated successfully!! Login to continue.');
          this.router.navigateByUrl('/');
        },
        (error)=>{
          this.loading = false;
          alert(error.error.errMessage);
        }
      )
    }
   
  }
