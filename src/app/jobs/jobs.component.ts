import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Job } from './job.model';
import { JobsService } from './jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  userSub = new Subscription();
  jobs: Job[] = [];
  isLogged = false;

  constructor(
    private jobsService: JobsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.jobs = this.jobsService.jobs;
    this.userSub = this.authService.user.subscribe((user) => {
      this.isLogged = !!user;
    });
  }
}
