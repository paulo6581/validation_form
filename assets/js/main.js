import ValidaCPF from "./modulos/validation_cpf.js";

class ValidaForm {
    constructor() {
        this.form  = document.querySelector('.formulario');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', event => {
            this.handleSubmit(event);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const fieldsValids = this.areValidFields();
        const passwordsValids = this.areValidPassword();

        if (fieldsValids && passwordsValids) {
            alert('Formulário Enviado com Sucesso!');
            this.form.submit();
        }
    }

    areValidFields() {
        let valid = true;

        for (let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove(); 
        }

        for (let field of this.form.querySelectorAll('.validar')) {
            const label = field.previousElementSibling.innerText;

            if (!field.value) {
                this.createError(field, `Campo "${label}" não pode estar em branco`);
                valid = false;
            }

            if (field.classList.contains('cpf')) {
                if (!this.validaCPF(field)) valid = false;
            }

            if (field.classList.contains('usuario')) {
                if (!this.validaUser(field)) valid = false;
            }
        }

        return valid;
    }

    validaCPF(field) {
        const cpf = new ValidaCPF(field.value);

        if (!cpf.valida()) {
            this.createError(field, 'CPF Inválido.');
            return false;
        }
        return true;
    }

    validaUser(field) {
        const usuario = field.value;
        let valid = true;
        if (usuario.length < 3 || usuario.length > 12) {
            this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres');
            valid = false;
        }

        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Usuário precisa conter letras e/ou números');
            valid = false;
        }
        return valid;
    }

    areValidPassword() {
        let valid = true;

        const senha = this.form.querySelector('.senha');
        const repetirSenha = this.form.querySelector('.repetir-senha');

        if (senha.value !== repetirSenha.value) {
            valid = false;
            this.createError(senha, 'Campos senha e repetir senha preicisam ser iguais.');
            this.createError(repetirSenha, 'Campos senha e repetir senha preicisam ser iguais.');
        }

        if (senha.value.length < 6 || senha.value.length > 12) {
            valid = false;
            this.createError(senha, 'Senha precisa ter entre 6 e 12 caracteres');
        }

        return valid;
    }
 
    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaForm();    