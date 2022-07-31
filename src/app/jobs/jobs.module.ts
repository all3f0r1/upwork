import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobsComponent } from './jobs.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobItemComponent } from './jobs-list/job-item/job-item.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: JobDetailComponent,
      },
      {
        path: ':id/edit',
        component: JobEditComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [JobsComponent, JobDetailComponent, JobsListComponent, JobItemComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [JobsComponent],
})
export class JobsModule {}
