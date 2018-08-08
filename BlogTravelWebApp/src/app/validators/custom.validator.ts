import { FormControl } from '@angular/forms';

export class CustomValidator {
    static EmailValidator(control :FormControl) {
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!EMAIL_REGEX.test(control.value))
            return { "E-mail inválido": true};

        return null;
    }

    static SelectValidator(control: FormControl){
        let value: number = control.value.toString();

        if(value == 0) {
            return {"Selecione uma opção.": true};
        }

        return null;
    }

    static RemoveCharacters(txt :string) {
        return txt.replace(/[^\w\s]/gi, '')
    }
}

