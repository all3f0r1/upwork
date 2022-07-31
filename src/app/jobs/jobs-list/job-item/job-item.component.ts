import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Job } from '../../job.model';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css'],
})
export class JobItemComponent implements OnInit {
  id!: number;
  isLogged = false;
  @Input()
  job!: Job;
  authSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.user.subscribe((user) => {
      this.isLogged = !!user;
    });
  }
}
