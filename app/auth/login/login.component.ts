import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {}
  errorMessage = "";
  username: string;
  password: string;


  onSignIn(form:NgForm){
    if(form.invalid) {
      return;
    }
    
      this.auth.signInUser(this.username, this.password).subscribe(
        (val) => {
           if(val.success){
            this.errorMessage = "";
            this.auth.setAccessToken(val.token);
            this.auth.setUser(JSON.stringify(val.user));
            this.auth.setUserRoles(JSON.stringify(val.roles));
            
            this.router.navigate(['/deal'])
           }
        },
        error => {
            console.log("POST call in error", error);
            if(error.status == 401){
              this.errorMessage = "username or password is invalid";
            }
        },
        () => {
            console.log("The POST observable is now completed.");
        });
    
  }

}


