import PostCompanies from 'constants/postCompanies';

const POST_OFFICES_OPTIONS = {
  [PostCompanies.UKRPOSHTA]: [
    { label: '01001: Khreshchatyk str., 22', value: '01001' },
    { label: '01008: Sadovaya str., 3', value: '01008' },
    { label: '01010: Hryhoriya Tsaryka str., 5', value: '01010' },
    { label: '03031: Vokzalnaya square, 1, Train station', value: '03031' },
    { label: '03035: Vasylia Lypkivskoho str., 23', value: '03035' },
    { label: '03036: Vozduhoflotskiy Avenue, 75', value: '03036' },
    { label: '04212: Heroiv polku "Azov" str., 9', value: '04212' },
    { label: '04213: Volodymyr Ivasyuk Avenue, 56-B', value: '04213' },
    { label: '04214: Heroiv Dnipra str., 53', value: '04214' },
    { label: '04215: Svobody Avenue, 26', value: '04215' },
  ],
  [PostCompanies.NOVA_POST]: [
    { label: '1: Pyrohivsky Shlyakh str., 135', value: '1' },
    { label: '2: Bohatyrska str., 11', value: '2' },
    { label: '3: Kalachivska str., 13 (Old Darnytsia)', value: '3' },
    { label: '4: Verkhovynna str., 69', value: '4' },
    {
      label: '5: Fedorova str., 32 (near Olympiyska metro station)',
      value: '5',
    },
    {
      label: '6: Mykola Vasylenko str., 2 (near Beresteiska metro station)',
      value: '6',
    },
    {
      label: '7: Hnata Khotkevycha str., 8 (near Chernihivska metro station)',
      value: '7',
    },
    { label: '8: Naberezhno-Khreshchatytska str., 33', value: '8' },
    {
      label: '9: Vyacheslav Chornovol Lane, 54-A (near Zhytomyr Bridge area)',
      value: '9',
    },
    { label: '10: Vasylia Zhukovskoho str., 22-A', value: '10' },
  ],
  [PostCompanies.MEEST_POSHTA]: [
    { label: '1: Kharchenko Yevgena str., 47-A', value: '1' },
    { label: '2: Shcherbakivskogo (Shcherbakova) str., 45', value: '2' },
    { label: '3: Butlierova Akademika str., 8-B', value: '3' },
    { label: '4: Poliarna str., 15-B', value: '4' },
    { label: '5: Myru Avenue, 5', value: '5' },
    { label: '7: Pryluzhna str., 4/15', value: '7' },
    { label: '8: Dovzhenka Oleksandra str., 1', value: '8' },
    { label: '9: Danyla Shcherbakivskogo str., 72/7', value: '9' },
    { label: '10: Malyshka Andriia str., 3У', value: '10' },
    { label: '11: Sobornosti Avenue, 7-B', value: '11' },
  ],
};

export default POST_OFFICES_OPTIONS;
