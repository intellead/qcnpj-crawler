'use strict';/**
 * Created by vinigomes on 13/06/2017.
 */

class Empresa {

    constructor (nome, cnpj, atividadePrincipal, situacao, capitalSocial, telefone) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.atividadePrincipal = atividadePrincipal;
        this.situacao = situacao;
        this.capitalSocial = capitalSocial;
        this.telefone = telefone;
    }

    toString () {
        return  "Nome: " + this.nome + "\n" +
                "CNPJ: " + this.cnpj + "\n" +
                "Atividade Principal: " + this.atividadePrincipal + "\n" +
                "Situação: " + this.situacao + "\n" +
                "Capital Social: " + this.capitalSocial + "\n" +
                "Telefone: " + this.telefone + "\n";
    }

    print () {
        console.log(this.toString());
    }

}

module.exports = Empresa;/**
 * Created by vinigomes on 13/06/2017.
 */
