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
  serverMessage:any;
  signinForm: FormGroup;
  unverifiedEmail: any;
  emailDomain!: string;

  constructor(private authService: AuthService, private router: Router){
		authService.home().subscribe({
			next: res => {
        this.serverMessage = res;
			},
			error: err => {
        this.serverMessage = err;
        console.log(err);
			}
		});
    this.signinForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    if(this.authService.getToken()){
			let user = this.authService.getUser();
			let role = user.role;
      if(role === 'su' || role === 'ia'){
        this.router.navigate(["dashboard"]);
      }
      // else if(role === 'ap'){
      //   this.router.navigate(["user"]);
      // }else if(role === 'ev'){
      //   this.router.navigate(["evaluate"]);
      // }
    }
  }
  
  signin():void{
    if(this.signinForm.valid){
      this.authService.signin(this.signinForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.authService.saveToken(res.token);
          this.authService.saveUser(res);
          window.location.reload();
        },
        error: (err) => {
          if(err.status === 401){
            this.signinForm.controls['password'].setErrors({password:true});
          }else if(err.status === 404){
            this.signinForm.controls['password'].setErrors({notFound:true});
          }else if(err.status === 403){
            this.unverifiedEmail = this.signinForm.value.email;
            this.emailDomain = "https://" + this.unverifiedEmail.substring(this.unverifiedEmail.lastIndexOf("@") +1);
            this.signinForm.controls['email'].setErrors({unverified:true});
          }
        }
      })
    }
  }
}
