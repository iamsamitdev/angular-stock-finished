import { Component,OnInit, inject} from '@angular/core'
import { MatCard } from '@angular/material/card'
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    MatCard,
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit {

  private meta = inject(Meta)

  ngOnInit() {
    // กำหนด Meta Tag description
    this.meta.addTag({ name: 'description', content: 'Login page for Stock Management' })
  }


}
