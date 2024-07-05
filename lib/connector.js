const axios = require('axios');

/**
 * This function generates us an access token
 */
const generateAuthToken = async () => {
  const { SECRET_KEY, SECRET_ID, BASE_URL } = process.env;
  let response;

  const formData = {
    secret_id: SECRET_ID,
    secret_key: SECRET_KEY,
  };

  try {
    response = await axios({
      url: `${BASE_URL}/api/v2/token/new/`,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  } catch (err) {
    console.log('Could not generate token', err);
    throw err;
  }

  return response.data;
};

/**
 * This function looks up all the bank institutions available
 * in the go cardless api
 */
const lookupInstitutions = async access_token => {
  let data;

  const options = {
    url: `${process.env.BASE_URL}/api/v2/institutions`,
    method: 'GET',
    params: {
      country: 'gb',
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    ({ data } = await axios(options));
  } catch (err) {
    console.log('Could not lookup bank institutions', err);
    throw err;
  }
  return data;
};

/**
 * Creates a end user agreement between client and the user
 */
const createEndUserAgreement = async (
  access_token,
  institution_id
) => {
  let data

  const options = {
    url: `${process.env.BASE_URL}/api/v2/agreements/enduser/`,
    method: 'POST',
    data: {
      institution_id,
      max_historical_days: '100',
      access_valid_for_days: '50',
      access_scope: ['transactions', 'balances', 'details'],
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
      Content_type: 'application/json',
    },
  };

  try {
    ({ data } = await axios(options));
  } catch (err) {
    throw err;
  }

  return data;
};

/**
 * Creates a requisition, this is the endpoint that builds
 * the link between the user and their bank.
 */
const buildLink = async payload => {
  let data;
  const { institution_id, access_token, agreement_id } = payload;

  const options = {
    url: `${process.env.BASE_URL}/api/v2/requisitions`,
    method: 'POST',
    data: {
      institution_id,
      agreement: agreement_id,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
      Content_type: 'application/json',
    },
  };

  try {
    ({ data } = await axios(options));
  } catch (err) {
    throw err;
  }

  return data;
};

/**
 * Gets all the available accounts
 */
const getAccounts = async (
  requisition_id,
  access_token
) => {
  let data;
  const options = {
    url: `${process.env.BASE_URL}/api/v2/requisitions/${requisition_id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  };

  try {
    ({ data } = await axios(options));
  } catch (err) {
    throw err;
  }

  return data;
};

/**
 * Gains account access and retrieves all the account transactions
 */
const accessAccounts = async (
  account_id,
  access_token
) => {
  let data;
  const options = {
    url: `${process.env.BASE_URL}/api/v2/accounts/${account_id}/transactions/`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  };

  try {
    ({ data } = await axios(options));
  } catch (err) {
    throw err;
  }

  return data;
};

module.exports = {
  generateAuthToken,
  lookupInstitutions,
  createEndUserAgreement,
  buildLink,
  getAccounts,
  accessAccounts,
}


