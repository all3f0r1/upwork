import { Injectable } from '@angular/core';
import { Job } from './job.model';

@Injectable({ providedIn: 'root' })
export class JobsService {
  jobs = [
    new Job('Backend dev', 'Carglass', 'Zaventem'),
    new Job('Frontend dev', 'Disney', 'Paris'),
  ];

  getJob(index: number): Job {
    return this.jobs[index];
  }
}
