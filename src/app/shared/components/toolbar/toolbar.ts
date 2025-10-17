import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-toolbar',
  imports: [Menubar, ToggleSwitchModule, ButtonModule,FormsModule,RouterLink],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar implements OnInit{

  checked = false;
  isMobile = window.innerWidth <= 960;
  items: MenuItem[] = [];

  @HostListener('window:resize')
  onResize() {
    const isMobile = window.innerWidth <= 960;
    const changerTheme = this.items.find(i => i.label === 'Changer de thème');
    if (changerTheme) changerTheme.visible = isMobile;
  }

  ngOnInit() {
    this.items = [
      { label: 'Firewalls',icon: 'pi pi-shield', routerLink: "/firewalls" },
      { label: 'Policies', icon:'pi pi-lock', routerLink: "/policies" },
      { label: 'Rules', icon:'pi pi-cog', routerLink: "rules" },
      {
        label: 'Changer de thème',
        command: () => this.toggleDarkMode(),
        visible: window.innerWidth <= 960
      }
    ];
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('app-dark');
  }
}
