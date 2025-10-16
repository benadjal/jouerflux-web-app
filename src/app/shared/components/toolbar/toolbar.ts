import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-toolbar',
  imports: [Menubar, ToggleSwitchModule, ButtonModule,FormsModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {

  checked = false;

  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('app-dark');
  }
}
