import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { AuthenticateDataService } from '../../services/authenticate-data.service';
import { AppConfig } from "../../../environments/app-config";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  // providers: [AuthenticateDataService]
})
export class LoginPageComponent implements OnInit {
 
  public form: FormGroup;

  constructor(private fb: FormBuilder, private authenticateService: AuthenticateDataService, private router: Router) {
    if(localStorage.getItem(AppConfig.auth_token)){
      this.router.navigateByUrl(AppConfig.defaultRoute);
    }
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      password: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
   }

  ngOnInit() {
  }

  submit() {
    this.authenticateService.login(this.form.value);
  }

}
