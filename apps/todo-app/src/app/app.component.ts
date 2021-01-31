import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppSyncClient } from '@rcf/appsync';
import { onAuthUIStateChange, AuthState, FormFieldTypes, PhoneFormFieldType } from '@aws-amplify/ui-components';

@Component({
  selector: 'rcf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hydrated = false;
  isLoggedIn = false;
  formFields: FormFieldTypes = [
    {
      type: "name",
      label: "Full name",
      placeholder: "Enter your full name",
      required: true
    },
    {
      type: "custom:business",
      label: "Business name",
      placeholder: "Enter you business name",
      required: true
    },
    {
      type: "phone_number",
      label: "Phone number",
      placeholder: "4123456789",
      required: true,
      dialCode: "+61",
    } as PhoneFormFieldType,
    {
      type: "email",
      label: "Email address",
      required: true
    },
    {
      type: "password",
      label: "Password",
      required: true
    }
  ];

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    AppSyncClient.hydrated().then(client => (this.hydrated = !!client));
    onAuthUIStateChange((authState, authData) => {
      if (authState === AuthState.SignedOut && this.isLoggedIn) {
        AppSyncClient.clearStore().then(() =>
          console.log('User signed out, store cleared!')
        );
      }
      this.isLoggedIn =
        authState === AuthState.SignedIn || authState === AuthState.ConfirmSignIn;
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}