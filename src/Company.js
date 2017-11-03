'use strict';

/*
 *
 * Copyright 2017 Softplan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
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
