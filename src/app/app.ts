import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Toolbar } from "./shared/components/toolbar/toolbar";
import { SideBar } from "./shared/components/side-bar/side-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Toolbar, SideBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
