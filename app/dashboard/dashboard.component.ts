import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  user=this.authService.getUser();

  constructor(private authService:AuthService) { }

  ngOnInit() {
    
  }

  onClick(){

  }

}
