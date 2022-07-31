import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Job } from '../job.model';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent implements OnInit, OnDestroy {
  @Input()
  id!: number;
  job!: Job;
  authSub = new Subscription();
  isLogged = true;

  constructor(
    private jobsService: JobsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.job = this.jobsService.getJob(+this.id);
    });
    this.authService.user.subscribe((user) => {
      this.isLogged = !!user;
    });
  }
}
