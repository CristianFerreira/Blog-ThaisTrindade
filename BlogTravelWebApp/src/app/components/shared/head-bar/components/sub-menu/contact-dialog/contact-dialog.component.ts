import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { ContactService } from '../../../../../../services/contact-service';
import { Post } from '../../../../../../models/api/Post';
import { Router } from '@angular/router';
import { CustomValidator } from '../../../../../../validators/custom.validator';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {

  public posts: Array<Post>;
  public form: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ContactDialogComponent>, private contactService: ContactService, private router: Router,
              public snackBar: MatSnackBar) {

    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
      ])],
      email: ['', Validators.compose([
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      subject: ['', Validators.compose([
        Validators.required,
      ])],
      message: ['', Validators.compose([
        Validators.required,
      ])],
    })
   }

  verifyContact() :void {
      if (this.form.valid)
        this.send(this.form.value);
      else
        this.validateAllFormFields(this.form);
    
  }

  send(contact :any) :void {
    this.contactService.send(contact).subscribe((data) => {
      this.snackBar.open("Obrigado por entrar em contato!", "", {
        duration: 3000,
      });
      this.dialogRef.close();
    }), error => {}
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        console.log("if: " + control);
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
