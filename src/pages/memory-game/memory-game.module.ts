import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemoryGamePage } from './memory-game';

@NgModule({
  declarations: [
    MemoryGamePage,
  ],
  imports: [
    IonicPageModule.forChild(MemoryGamePage),
  ],
})
export class MemoryGamePageModule {}
