import { Country, CountryId } from '../types/game';

export const countriesData: Country[] = [
  {
    id: 'egypt' as CountryId,
    name: 'Egypt',
    nameAr: 'مصر',
    population: 110000000,
    gdp: 400000000000, // $400 billion
    militaryPower: 85,
    leader: 'Player',
  },
  {
    id: 'libya' as CountryId,
    name: 'Libya',
    nameAr: 'ليبيا',
    population: 7000000,
    gdp: 45000000000, // $45 billion
    militaryPower: 45,
    leader: 'Abdul Hamid Dbeibah',
  },
  {
    id: 'sudan' as CountryId,
    name: 'Sudan',
    nameAr: 'السودان',
    population: 46000000,
    gdp: 35000000000, // $35 billion
    militaryPower: 55,
    leader: 'Abdel Fattah al-Burhan',
  },
  {
    id: 'palestine' as CountryId,
    name: 'Palestine',
    nameAr: 'فلسطين',
    population: 5300000,
    gdp: 18000000000, // $18 billion
    militaryPower: 20,
    leader: 'Mahmoud Abbas',
  },
  {
    id: 'jordan' as CountryId,
    name: 'Jordan',
    nameAr: 'الأردن',
    population: 11000000,
    gdp: 47000000000, // $47 billion
    militaryPower: 60,
    leader: 'King Abdullah II',
  },
  {
    id: 'saudi_arabia' as CountryId,
    name: 'Saudi Arabia',
    nameAr: 'السعودية',
    population: 36000000,
    gdp: 1100000000000, // $1.1 trillion
    militaryPower: 90,
    leader: 'Mohammed bin Salman',
  },
];

export const getCountryById = (id: CountryId): Country | undefined => {
  return countriesData.find(country => country.id === id);
};

export const getNeighboringCountries = (): Country[] => {
  return countriesData.filter(country => country.id !== 'egypt');
};
