import { Component, OnInit } from '@angular/core';
import { Job } from '../job.model';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.jobs = this.jobsService.jobs;
  }
}
