import { Component, OnInit, inject, ViewChild  } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Subject } from 'rxjs'
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
  MatCardActions
} from '@angular/material/card'
import { MatIconButton, MatButton } from '@angular/material/button'
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatTableDataSource
} from '@angular/material/table'
import { DecimalPipe, SlicePipe } from '@angular/common'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatFormField, MatSuffix } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort, MatSortHeader } from '@angular/material/sort'

import { Meta } from '@angular/platform-browser'

// Import ProductService
import { ProductService } from '../../services/product.service'

// Import Environment
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatFormField,
    MatSuffix,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatInput,
    FormsModule,
    DecimalPipe,
    SlicePipe,
    MatIconButton, 
    MatButton
  ]
})
export class StockComponent implements OnInit {

  private http = inject(ProductService)
  private meta = inject(Meta)

  // Image URL
  imageUrl = environment.dotnet_api_url_image
  dataSource = new MatTableDataSource<Record<string,string>>()
  searchValue = ''
  searchTerm = new Subject<string>()

  page = 1
  limit = 100
  selectedCategory = ''
  searchQuery = ''

  // Columns for Table
  displayedColumns = [
    'productID',
    'productPicture',
    'productName',
    'unitPrice',
    'unitInStock',
    'categoryName',
    'action',
  ]

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  // Method getProducts
  getProducts() {
    this.http
    .getAllProducts(
      this.page,
      this.limit,
      this.selectedCategory,
      this.searchQuery
    )
    .subscribe({
      next: (result) => {
        console.log(result)
        this.dataSource.data = result.products
      },
      error: (error) => {
        console.error(error)
      },
    })
  }
 
  // Method ngOnInit
  ngOnInit(): void {
    // กำหนด Meta Tag description
    this.meta.addTag({ name: 'description', content: 'Stock page for Stock Management' })

    // ดึงข้อมูลสินค้า
    this.getProducts()

  }

  // Method ngAfterViewInit
  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  // Method onClickDelete
  onClickDelete(row: any) {
    // do remote
    // this.dataSource.data = await lastValueFrom(
    //   this.rest.deleteProduct(this.selectedProduct)
    // );
  }

  // Method doFilter
  async doFilter(event: any) {
    // do local
    this.dataSource.filter = event.target.value.trim()
    // do remote
    // this.dataSource.data = await lastValueFrom(
    //   this.rest.getProductByKeyword(event.target.value)
    // );
  }

  // Method clearSearch
  clearSearch() {
    this.searchValue = ''
    this.searchTerm.next('')
    this.dataSource.filter = ''
  }

  // Method Export to PDF
  onClickExportPDF() {
    // do something
  }

  // Method Export to Excel
  onClickExportCSV() {
    // do something
  }

}