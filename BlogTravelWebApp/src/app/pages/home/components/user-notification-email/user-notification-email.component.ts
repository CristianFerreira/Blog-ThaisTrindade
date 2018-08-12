import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CustomValidator } from '../../../../validators/custom.validator';
import { UserNotificationEmailService } from "../../../../services/user-notification-email.service"
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-notification-email',
  templateUrl: './user-notification-email.component.html',
  styleUrls: ['./user-notification-email.component.scss']
})
export class UserNotificationEmailComponent {
  public form: FormGroup;
  errorEmailDisable :boolean
  errorEmailActive: boolean
  email: string;

  constructor(private fb: FormBuilder, private userNotificationEmailService :UserNotificationEmailService, public snackBar: MatSnackBar) { 
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.maxLength(160),
        CustomValidator.EmailValidator,
        this.showErrorEmailDisable, 
        this.showErrorEmailActive
      ])]
    })
    this.errorEmailActive = false;
    this.errorEmailDisable = false;
    this.email = '';
  }


  Active() :void {
    if (this.form.controls.email.errors == null || (!this.form.controls.email.errors.required && !this.form.controls.email.errors.invalidEmail))
    {
      this.userNotificationEmailService.create(this.form.value.email).subscribe((data)=> {
        this.errorEmailDisable = false;
        if(data.json().message == "E-mail já está ativado"){     
          this.errorEmailActive = true;
          this.form.controls.email.setErrors({showErrorEmailActive: true})
        } else {
          this.form.controls.email.setErrors(null)
          this.email = "";
          this.snackBar.open("Notificação ativada com sucesso!", "OK", {
            duration: 4000,
          });
        }})  
    }
    else
    {
      this.validateAllFormFields(this.form);
    }    
  }


  showErrorEmailDisable(control: FormControl) {
        return null
    
}


showErrorEmailActive(control: FormControl) {
        return null
}

  disable() :void {
    if (this.form.controls.email.errors == null || (!this.form.controls.email.errors.required && !this.form.controls.email.errors.invalidEmail))
    {
      this.errorEmailActive = false;
      this.userNotificationEmailService.deleteByEmail(this.form.value.email).subscribe((data)=> {
        if(data.json().message == "Email não foi ativado"){
          this.errorEmailDisable = true;
          this.form.controls.email.setErrors({showErrorEmailDisable: true})
        }
        else {
          this.form.controls.email.setErrors(null)
          this.email = "";
          this.snackBar.open("Notificação desativada com sucesso!", "OK", {
            duration: 4000,
          });}
        })      
    }
    else
    {
      this.validateAllFormFields(this.form);
    }    
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
