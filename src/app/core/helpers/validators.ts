import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function cedula(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let array = control.value;
    if (array) {
      let num = array.length;

      if (num == 10) {

        let total: number = 0;
        let digito: number;
        let mult: number = 0;
        let decena: number;
        let final: number;

        digito = (array[9] * 1);
        for (let i = 0; i < (num - 1); i++) {
          mult = 0;
          if ((i % 2) != 0) {
            total = total + (array[i] * 1);
          } else {
            mult = array[i] * 2;
            if (mult > 9)
              total = total + (mult - 9);
            else
              total = total + mult;
          }
        }
        decena = total / 10;
        decena = Math.floor(decena);
        decena = (decena + 1) * 10;
        final = (decena - total);

        if ((final == 10 && digito == 0) || (final == digito)) {
          return null
        } else {
          return {invalidate: "Cédula invalida"};
        }
      } else {
        return {invalidate: "Cédula debe tener 10 digitos"};
      }
    }
    return null;
  }
}
