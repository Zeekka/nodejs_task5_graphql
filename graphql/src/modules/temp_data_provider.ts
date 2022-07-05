export const artists = [
  {
    id: '1321j3hj12g3jh',
    firstName: 'name1',
    secondName: 'sname1',
    middleName: 'mname1',
    birthDate: '16.11.1999',
    birthPlace: 'Place',
    country: 'USA',
    bands: ['oidsfysodify32234'],
    instruments: ['guitar', 'piano'],
  },
  {
    id: '12321hgjsdga7',
    firstName: 'name2',
    secondName: 'sname2',
    middleName: 'mname3',
    birthDate: '16.11.1988',
    birthPlace: 'Place2',
    country: 'USSR',
    bands: ['oidsfyssdfdsfy32234'],
    instruments: ['guitar', 'drums'],
  },
  {
    id: 'adhkajsdh8282',
    firstName: 'name3',
    secondName: 'sname3',
    middleName: 'mname3',
    birthDate: '16.11.1977',
    birthPlace: 'Place3',
    country: 'UK',
    bands: ['dsfsdfsdf22123'],
    instruments: ['guitar'],
  },
];

export const bands = [
  {
    id: 'oidsfysodify32234',
    name: 'DeadCrows',
    origin: 'NewYork',
    members: ['adhkajsdh8282', '12321hgjsdga7'],
    website: 'https://deadc.com',
    genres: ['23213k2k3j231', 'sdsdf323323231'],
  },
  {
    id: 'oidsfyssdfdsfy32234',
    name: 'DeadPony',
    origin: 'NewArc',
    members: ['1321j3hj12g3jh', '12321hgjsdga7'],
    website: 'https://dead2c.com',
    genres: ['23213k2k3j231', '12313124231'],
  },
  {
    id: 'dsfsdfsdf22123',
    name: 'DeadStatic',
    origin: 'Minsk',
    members: ['1321j3hj12g3jh', 'adhkajsdh8282'],
    website: 'https://deadcm232.com',
    genres: ['23213k2k3j231', '23213dsfsdfsd'],
  },
];

export const genres = [
  {
    id: '23213k2k3j231',
    name: 'Rock',
    description: 'Rock description',
    country: 'USA',
    year: 1990,
  },
  {
    id: '23213dsfsdfsd',
    name: 'Pop',
    description: 'Pop description',
    country: 'Korea',
    year: 1991,
  },
  {
    id: '12313124231',
    name: 'Jazz',
    description: 'Jazz description',
    country: 'France',
    year: 1992,
  },
  {
    id: 'sdsdf323323231',
    name: 'Punk',
    description: 'Punk description',
    country: 'UK',
    year: 1993,
  },
];

export const albums = [
  {
    id: '12345',
    name: 'Boom boom',
    released: 1999,
    artists: ['1321j3hj12g3jh', '12321hgjsdga7'],
    bands: ['oidsfysodify32234'],
    tracks: ['12345', '5678890'],
    genres: ['23213k2k3j231', '23213dsfsdfsd'],
    image: 'image.boom.com',
  },
  {
    id: '56789',
    name: 'Dead boom',
    released: 2002,
    artists: ['1321j3hj12g3jh', 'adhkajsdh8282'],
    bands: ['dsfsdfsdf22123'],
    tracks: ['12345', '135790'],
    genres: ['23213k2k3j231', '12313124231'],
    image: 'dead.boomboob.com',
  },
  {
    id: '10293',
    name: 'Big dead',
    released: 2003,
    artists: ['12321hgjsdga7', 'adhkajsdh8282'],
    bands: ['oidsfyssdfdsfy32234'],
    tracks: ['5678890', '24680'],
    genres: ['sdsdf323323231', '12313124231'],
    image: 'dead.pop.big.com',
  },
];

export const tracks = [
  {
    id: '12345',
    title: 'The Only',
    albums: ['12345'],
    bands: ['oidsfysodify32234'],
    duration: 189,
    released: 2010,
    genres: ['23213k2k3j231', '23213dsfsdfsd'],
  },
  {
    id: '5678890',
    title: 'Malo',
    albums: ['56789'],
    bands: ['oidsfyssdfdsfy32234'],
    duration: 178,
    released: 2002,
    genres: ['sdsdf323323231', '23213dsfsdfsd'],
  },
  {
    id: '135790',
    title: 'Greey',
    albums: ['12345'],
    bands: ['dsfsdfsdf22123'],
    duration: 160,
    released: 2011,
    genres: ['sdsdf323323231', '12313124231'],
  },
  {
    id: '24680',
    title: 'Korn',
    albums: ['10293'],
    bands: ['oidsfysodify32234'],
    duration: 184,
    released: 2012,
    genres: ['23213k2k3j231', '12313124231'],
  },
];

export const users = [
  {
    id: '12345',
    firstName: 'Bob',
    secondName: 'Bobski',
    password: 'password',
    email: 'bob.email.com',
  },
  {
    id: '54321',
    firstName: 'Lisa',
    secondName: 'Bobski',
    password: 'password1',
    email: 'lisa.email.com',
  },
  {
    id: '13579',
    firstName: 'Klya',
    secondName: 'Bobski',
    password: 'password2',
    email: 'klya.email.com',
  },
  {
    id: '24680',
    firstName: 'Nina',
    secondName: 'Bobski',
    password: 'password',
    email: 'Nina.email.com',
  },
];

// type Favourites {
//     id: ID!
//     userId: ID
//     bands: [Band]
//     genres: [Genre]
//     artists: [Artist]
//     tracks: [Track]
// }

export const favourites = [
  {
    id: '12345',
    userId: '12345',
    bands: ['oidsfysodify32234', 'oidsfyssdfdsfy32234'],
    genres: ['23213k2k3j231', '23213dsfsdfsd'],
    artists: ['1321j3hj12g3jh', '12321hgjsdga7'],
    tracks: ['12345'],
  },
  {
    id: '24680',
    userId: '13579',
    bands: ['oidsfyssdfdsfy32234'],
    genres: ['23213dsfsdfsd'],
    artists: ['1321j3hj12g3jh', '12321hgjsdga7'],
    tracks: ['12345'],
  },
];
