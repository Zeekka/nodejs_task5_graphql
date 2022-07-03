export let artists = [
    {
        id: '1321j3hj12g3jh',
        firstName: 'name1',
        secondName: 'sname1',
        middleName: 'mname1',
        birthDate: '16.11.1999',
        birthPlace: 'Place',
        country: 'USA',
        bands: ["oidsfysodify32234"],
        instruments: ['guitar', 'piano']
    },
    {
        id: '12321hgjsdga7',
        firstName: 'name2',
        secondName: 'sname2',
        middleName: 'mname3',
        birthDate: '16.11.1988',
        birthPlace: 'Place2',
        country: 'USSR',
        bands: ["oidsfyssdfdsfy32234"],
        instruments: ['guitar', 'drums']
    },
    {
        id: 'adhkajsdh8282',
        firstName: 'name3',
        secondName: 'sname3',
        middleName: 'mname3',
        birthDate: '16.11.1977',
        birthPlace: 'Place3',
        country: 'UK',
        bands: ["dsfsdfsdf22123"],
        instruments: ['guitar']
    }
]


export let bands = [
    {
        id: "oidsfysodify32234",
        name: "DeadCrows",
        origin: "NewYork",
        members: ["adhkajsdh8282", "12321hgjsdga7"],
        website: "https://deadc.com",
        genres: ["23213k2k3j231", "sdsdf323323231"]
    },
    {
        id: "oidsfyssdfdsfy32234",
        name: "DeadPony",
        origin: "NewArc",
        members: ["1321j3hj12g3jh", "12321hgjsdga7"],
        website: "https://dead2c.com",
        genres: ["23213k2k3j231", "12313124231"]
    },
    {
        id: "dsfsdfsdf22123",
        name: "DeadStatic",
        origin: "Minsk",
        members: ["1321j3hj12g3jh", "adhkajsdh8282"],
        website: "https://deadcm232.com",
        genres: ["23213k2k3j231", "23213dsfsdfsd"]
    }
];

export let genres = [
    {
        id: "23213k2k3j231",
        name: "Rock",
        description: "Rock description",
        country: "USA",
        year: 1990
    },
    {
        id: "23213dsfsdfsd",
        name: "Pop",
        description: "Pop description",
        country: "Korea",
        year: 1991
    },
    {
        id: "12313124231",
        name: "Jazz",
        description: "Jazz description",
        country: "France",
        year: 1992
    },
    {
        id: "sdsdf323323231",
        name: "Punk",
        description: "Punk description",
        country: "UK",
        year: 1993
    }
];

export let albums = [
    {
        id: "12345",
        name: "Boom boom",
        released: 1999,
        artists: ["1321j3hj12g3jh", "12321hgjsdga7"],
        bands: ["oidsfysodify32234"],
        //tracks = [],
        genres: ["23213k2k3j231", "23213dsfsdfsd"],
        image: "image.boom.com"
    },
    {
        id: "56789",
        name: "Dead boom",
        released: 2002,
        artists: ["1321j3hj12g3jh", "adhkajsdh8282"],
        bands: ["dsfsdfsdf22123"],
        //tracks = [],
        genres: ["23213k2k3j231", "12313124231"],
        image: "dead.boomboob.com"
    },
    {
        id: "10293",
        name: "Big dead",
        released: 2003,
        artists: ["12321hgjsdga7", "adhkajsdh8282"],
        bands: ["oidsfyssdfdsfy32234"],
        //tracks = [],
        genres: ["sdsdf323323231", "12313124231"],
        image: "dead.pop.big.com"
    }
];