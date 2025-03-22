import {GoCardlessClient} from "./index";

const client = new GoCardlessClient();

// Getting all institutions
client.institutions.getInstitutionsByCountry("GB")
    .then(institutions => {

        }
    )