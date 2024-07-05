export declare const generateAuthToken: () => Promise<any>;
export declare const lookupInstitutions: (access_token: string) => Promise<any>;
export declare const createEndUserAgreement: (
  access_token: string,
  institution_id: string
) => Promise<any>;
export declare const buildLink: (payload: {
  institution_id: string;
  access_token: string;
  agreement_id: string;
}) => Promise<any>;
export declare const getAccounts: (
  requisition_id: string,
  access_token: string
) => Promise<any>;
export declare const accessAccounts: (
  account_id: string,
  access_token: string
) => Promise<any>;
