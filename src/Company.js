'use strict';/**
 * Created by vinigomes on 13/06/2017.
 */

class Company {

    constructor (name, cnpj, main_activity_text, main_activity_code, situation, social_capital, telephone) {
        this.company = name;
        this.cnpj = cnpj;
        this.main_activity_name = main_activity_text;
        this.main_activity_code = main_activity_code
        this.company_situation = situation;
        this.company_social_capital = social_capital;
        this.company_telephone = telephone;
    }

    toString () {
        return  "Name: " + this.company + "\n" +
                "CNPJ: " + this.cnpj + "\n" +
                "Main Activity: " + this.main_activity_name + "\n" +
                "Situation: " + this.company_situation + "\n" +
                "Social Capital: " + this.company_social_capital + "\n" +
                "Telephone: " + this.company_telephone + "\n";
    }

    print () {
        console.log(this.toString());
    }

}

module.exports = Company;
