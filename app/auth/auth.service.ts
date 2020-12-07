import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Subject, Observable } from 'rxjs';

interface UserPostResponse {
    success: boolean,
    token :string,
    user : object,
    roles : object
  }

@Injectable()
export class AuthService {
    baseUrl = environment.baseUrl;
    userDataChanges = new Subject<any>();
    ROLE =  {
        APP_ADMIN: "1",
        ORG_ADMIN: "2",
        USER : "3"
    }
    constructor(private router:Router,private http:HttpClient , private cookieService:CookieService){

    }
    signInUser(username:string,password:string){
       return  this.http.post<UserPostResponse>(this.baseUrl +"login",{"username":username,"password":password })
    } 

    setAccessToken(token) {
        var now = new Date();
        //now.setSeconds(now.getSeconds() + 5);
        now.setHours(now.getHours() + 3);
        //service.token = token;
        if (token) {
            this.cookieService.set('dealApp-token' , token, now);
        }
        else{
            this.cookieService.delete('dealApp-token');
        }	
    }
    setUser(user){
        var now = new Date();
        //now.setSeconds(now.getSeconds() + 5);
        now.setHours(now.getHours() + 3);
        this.cookieService.set('deal-app-user', user, now);
        //localStorage.setItem('deal-app-user', user);
        this.userDataChanges.next(JSON.parse(user));
    }
    setUserRoles(userRole){
        var now = new Date();
        //now.setSeconds(now.getSeconds() + 5);
        now.setHours(now.getHours() + 3);
        this.cookieService.set('deal-app-user-role', userRole, now);
        //localStorage.setItem('deal-app-user', user);
        //this.userDataChanges.next(JSON.parse(user));
    }
    getUser(){
        //return JSON.parse(localStorage.getItem('deal-app-user'));
        if(this.cookieService.get('deal-app-user')){
            return JSON.parse(this.cookieService.get('deal-app-user'));
        }else{
            return null;
        }
        
    }
    getUserRole(){
        // //return JSON.parse(localStorage.getItem('deal-app-user'));
        // if(this.cookieService.get('deal-app-user-role')){
        //     return JSON.parse(this.cookieService.get('deal-app-user-role'));
        // }else{
        //     return null;
        // }
        var roleModel = {};
			for(let role in this.ROLE)  {
				switch(role) {
					case "APP_ADMIN":
						roleModel['isAppAdmin'] = this.isRole(this.ROLE.APP_ADMIN);
						break;
                    case "ORG_ADMIN":
                        roleModel['isOrgAdmin'] = this.isRole(this.ROLE.ORG_ADMIN);
                        break;
                    case "USER":
                        roleModel['isUser'] = this.isRole(this.ROLE.USER);
                        break;    
					default:
						roleModel['isUser'] = true;
						break;
				}
			}
			return roleModel;
        
    }
    //return true if role exist
	 isRole(currentRole) {
			var role = JSON.parse(this.cookieService.get('deal-app-user-role'));
			if(role && role.length > 0) {
				for (var i = 0; i < role.length; i++) {
					if(currentRole == role[i].id) {
						return true;
					}
				}
			}
			return false;
		}
    getAccessToken(){
        return this.cookieService.get('dealApp-token');
    }

    deleteAccessTocken(){
        this.cookieService.delete('dealApp-token');
    }

    isAuthenticated(){
        if(this.cookieService.get('dealApp-token')){
            return true;
        }
        else{
            return false;
        }

    }
    logout(){
        this.cookieService.delete('dealApp-token');
        this.cookieService.delete('deal-app-user');
        this.userDataChanges.next(null);
        this.router.navigate(['login']);

    }

}