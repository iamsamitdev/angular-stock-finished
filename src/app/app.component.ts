import { Component, ViewChild, inject } from '@angular/core'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { HeaderComponent } from './components/header/header.component'
import { MenuComponent } from './components/menu/menu.component'
import { NgStyle } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav'
import { Title } from '@angular/platform-browser'

// Import AuthService
import { AuthService } from './services/auth.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [
      NgStyle, 
      MenuComponent, 
      HeaderComponent, 
      RouterOutlet, 
      MatSidenavModule,
    ]
})
export class AppComponent {

  private router = inject(Router)
  private titleService = inject(Title)
  private auth = inject(AuthService)

  isExpanded = true
  isLoggedIn = false

  @ViewChild('sidenav', { static: true }) sidenav: any

  ngOnInit(): void {

    // Check if the user is logged in or not with cookie
    this.isLoggedIn = this.auth.isLoggedIn() ? true : false

    // Update the page title when the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url
        this.updatePageTitle(url)
      }
    })

  }

  // Method to update the page title
  private updatePageTitle(url: string) {
    const routeObj = this.router.config.find((route) => ("/" + route.path) === url)
    let routeData = routeObj?.data
    if (routeData && routeData['title']) {
      this.titleService.setTitle(routeData['title'] + ' - Stock Management')
    } else {
      this.titleService.setTitle('Stock Management')
    }
  }

  // Method to toggle the sidebar
  toggleSideBar() {
    this.sidenav.toggle();
  }

}