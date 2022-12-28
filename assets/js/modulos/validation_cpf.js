class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: false,
            writable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    get issequencia() {
        return this.cpfLimpo[0].repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf() {
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfParcial);
        const digito2 = ValidaCPF.geraDigito(cpfParcial + digito1);

        this.newCpf = cpfParcial + digito1 + digito2;
    }

    static geraDigito(cpfParcial) {
        const cpfArray = Array.from(cpfParcial);
        let regressivo = cpfArray.length + 1;

        const total = cpfArray.reduce((acumulator, valor) => {
            acumulator += (regressivo * Number(valor));
            regressivo--;
            return acumulator;
        }, 0);

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    }

    valida() {
        if (!this.cpfLimpo ) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.issequencia) return false;

        this.geraNovoCpf();
        return this.newCpf === this.cpfLimpo;
    }
}

export default ValidaCPF;