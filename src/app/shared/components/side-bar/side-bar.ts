import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ButtonModule } from "primeng/button";

@Component({
  selector: 'app-side-bar',
  imports: [ButtonModule,RouterModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {

}
