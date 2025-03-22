import {GoCardlessClient} from "./index";

const client = new GoCardlessClient();
console.log('starting...')

// Getting all institutions
client.institutions.getInstitutionsByCountry("GB")
    .then(institutions => {
      console.log('...institutions', institutions)
    }).catch(err => console.log(err));