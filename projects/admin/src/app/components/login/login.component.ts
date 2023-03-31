import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private authService: AuthService, private router: Router){
    this.signinForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
  }
  ngOnInit():void{
  }
  
  signin():void{
    if(this.signinForm.valid){
      this.authService.signin(this.signinForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          if(err.status === 401){
            this.signinForm.controls['password'].setErrors({password:true});
          }else if(err.status === 404){
            this.signinForm.controls['password'].setErrors({notFound:true});
          }
        }
      })
    }
  }
}
