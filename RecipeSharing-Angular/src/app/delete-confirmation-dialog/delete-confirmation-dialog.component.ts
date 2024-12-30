import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog with "false" to indicate cancellation
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Close dialog with "true" to indicate confirmation
  }
}
