import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../../../validators/custom.validator';
import { ContactEmailService } from "../../../../services/contact-email.service"

@Component({
  selector: 'app-contact-email',
  templateUrl: './contact-email.component.html',
  styleUrls: ['./contact-email.component.scss']
})
export class ContactEmailComponent {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private contactEmailService :ContactEmailService) { 
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])]
    })

  }

  save() :void {
    this.contactEmailService.create(this.form.value.email).subscribe((data)=> {
      console.log(data);
    })
  }


}
