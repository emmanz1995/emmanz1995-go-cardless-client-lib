import {GoCardlessClient} from "./index";

const client = new GoCardlessClient();
// console.log('starting...')

// Getting all institutions
client.institutions.getInstitutionsByCountry("GB")
    .then(institutions => {
      console.log('...institutions1 parallel')
    }).catch(err => console.log(err));

client.institutions.getInstitutionsByCountry("GB")
    .then(institutions => {
        console.log('...institutions2 parallel')
    }).catch(err => console.log(err));


(async () => {
    console.log('starting...');

    try {
        const institutions1 = await client.institutions.getInstitutionsByCountry("GB");
        console.log('...institutions1');
    } catch (err) {
        console.error('Error fetching institutions1:', err);
    }

    try {
        const institutions2 = await client.institutions.getInstitutionsByCountry("GB");
        console.log('...institutions2');
    } catch (err) {
        console.error('Error fetching institutions2:', err);

    }
})();