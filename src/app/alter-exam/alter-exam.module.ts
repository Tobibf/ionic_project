import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterExamPageRoutingModule } from './alter-exam-routing.module';

import { AlterExamPage } from './alter-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AlterExamPageRoutingModule
  ],
  declarations: [AlterExamPage]
})
export class AlterExamPageModule {}
