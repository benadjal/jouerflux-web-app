import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-toolbar',
  imports: [Menubar,
    ToggleSwitchModule, ButtonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {

}
