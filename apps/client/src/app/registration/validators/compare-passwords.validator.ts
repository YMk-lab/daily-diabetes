import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ComparePasswordsValidator {

  static compare(): ValidatorFn {

    return (control: AbstractControl): any => {

      const passwordControl = control.get('password');
      const confirmPasswordControl = control.get('confirmPassword');
      const confirmPasswordControlErrors = confirmPasswordControl.errors;

      const error = confirmPasswordControl.value !== passwordControl.value ?
        { notMatched: true } :
        confirmPasswordControlErrors;

      confirmPasswordControl.setErrors(error);
    }

  }

}
