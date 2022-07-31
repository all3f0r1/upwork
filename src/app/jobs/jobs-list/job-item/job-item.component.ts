import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Job } from '../../job.model';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css'],
})
export class JobItemComponent implements OnInit {
  id!: number;
  isLogged = false;
  job!: Job;
  authSub!: Subscription;

  constructor(
    private authService: AuthService,
    private jobService: JobsService
  ) {}

  ngOnInit() {
    this.authSub = this.authService.user.subscribe((user) => {
      this.isLogged = !!user;
    });
    this.job = this.jobService.getJob(this.id);
  }
}
