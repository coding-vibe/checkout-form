import PostCompanies from 'constants/postCompanies';

const { UKRPOSHTA, NOVA_POST, MEEST_POSHTA } = PostCompanies;

const POST_COMPANIES_OPTIONS = [
  { label: 'Ukrposhta', value: UKRPOSHTA },
  { label: 'Nova Post', value: NOVA_POST },
  { label: 'Meest Poshta', value: MEEST_POSHTA },
];

export default POST_COMPANIES_OPTIONS;
