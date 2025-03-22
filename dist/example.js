"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const client = new index_1.GoCardlessClient();
console.log('starting...');
// Getting all institutions
client.institutions.getInstitutionsByCountry("GB")
    .then(institutions => {
    console.log('...institutions', institutions);
}).catch(err => console.log(err));
