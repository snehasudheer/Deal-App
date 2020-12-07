import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleGuardService implements CanActivate {

    constructor(private authService:AuthService){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        let roles = route.data["roles"] as Array<string>;
        let userRole = this.authService.getUserRole();

        if(userRole['isAppAdmin']){
            if(roles.indexOf('appadmin') > -1 ){
                return true;
            }
        }
        if(userRole['isOrgAdmin']){
            if(roles.indexOf('orgadmin') > -1 ){
                return true;
            }
        }
        if(userRole['isUser']){
            if(roles.indexOf('user') > -1 ){
                return true;
            }
        }
        return false;
    }

}