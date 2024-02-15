import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
 
  constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private userService: UserService
  ) { }
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  roleChecked = false;
  questions = [
    {
      question: "What is your mother's maiden name?",
      id: "1"
    },
    {
      question: "What is the name of your first pet?",
      id: "2"
    },
    {
      question: "What elementary school did you attend?",
      id: "3"
    },
    {
      question: "What is the name of the town where you were born?",
      id: "4"
    },
    {
      question: "What was your first car?",
      id: "5"
    }
  ];
  firstQuestionSet: { id: string, question: string }[] = this.questions;
  secondQuestionSet: { id: string, question: string }[] = this.questions;
 
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      selectedQueId1: ['', Validators.required],
      selectedQueId2: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
    });
  }
  
  get fval() { return this.registerForm.controls; }


  onFirstSelect(event: any){
    this.secondQuestionSet = this.questions.filter(que => que.id != event.target.value);
  }

  onSecondSelect(event: any){
    this.firstQuestionSet = this.questions.filter(que => que.id != event.target.value);
  }
  
  
  onFormSubmit(){
    const { selectedQueId1, selectedQueId2, answer1, answer2 } = this.registerForm.value;
    this.submitted = true;
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    let firstQue = this.questions.filter(que => que.id === selectedQueId1)
    let secondQue = this.questions.filter(que => que.id === selectedQueId2)

    let questionsArr = [
      {
        ...firstQue[0], answer: answer1 
      }, 
      {
        ...secondQue[0], answer: answer2 
      }]
    let formData = {...this.registerForm.value, questionsArr, role: this.roleChecked ? 'admin' : 'user'}
    this.userService.register(formData).subscribe(
      (data)=>{
        alert('User Registered successfully!!');
        this.router.navigateByUrl('/');
      },
      (error)=>{
        this.loading = false;
        alert(error.error.errMessage);
      }
    )
  }
 
}