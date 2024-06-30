import { Component, Inject, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog'

// Define the type of data that the dialog will receive
// type AlertDialogData = {
//   icon?: string
//   iconColor?: string
//   title: string
//   subtitle: string
// }

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss',
  standalone: true,
  imports: [
    MatIcon,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
  ],
})

export class AlertDialogComponent {

  @Inject(MAT_DIALOG_DATA)
  public data = inject(MAT_DIALOG_DATA)
  public dialogRef = inject(MatDialogRef<AlertDialogComponent>)

  closeDialog(): void {
    this.dialogRef.close(null)
  }

}
