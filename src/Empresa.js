'use strict';/**
 * Created by vinigomes on 13/06/2017.
 */

class Empresa {

    constructor (nome, cnpj, atividade_principal_text, atividade_principal_code, situacao, capital_social, telefone) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.atividade_principal = [
            {
                text: atividade_principal_text,
                code: atividade_principal_code
            }
        ];
        //this.atividade_principal = atividade_principal;
        this.situacao = situacao;
        this.capital_social = capital_social;
        this.telefone = telefone;
    }

    toString () {
        return  "Nome: " + this.nome + "\n" +
                "CNPJ: " + this.cnpj + "\n" +
                "Atividade Principal: " + this.atividade_principal + "\n" +
                "Situação: " + this.situacao + "\n" +
                "Capital Social: " + this.capital_social + "\n" +
                "Telefone: " + this.telefone + "\n";
    }

    print () {
        console.log(this.toString());
    }

}

module.exports = Empresa;/**
 * Created by vinigomes on 13/06/2017.
 */
