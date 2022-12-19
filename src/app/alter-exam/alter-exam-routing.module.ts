import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterExamPage } from './alter-exam.page';

const routes: Routes = [
  {
    path: '',
    component: AlterExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterExamPageRoutingModule {}
