import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Toolbar } from "./shared/components/toolbar/toolbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
