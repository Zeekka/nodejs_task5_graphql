import { Artist } from './Artist/model/artist.model.js';

export let artists = [
    {
        id: '1321j3hj12g3jh',
        firstName: 'name1',
        secondName: 'sname1',
        middleName: 'mname1',
        birthDate: '16.11.1999',
        birthPlace: 'Place',
        country: 'USA',
        // bands: [Band],
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
        // bands: [Band],
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
        // bands: [Band],
        instruments: ['guitar']
    },
];

export let bands = [
    {
        id: "oidsfysodify32234",
        name: "DeadCrows",
        origin: "NewYork",
        members: [artists[0] as Artist, artists[1] as Artist],
        website: "https://deadc.com"
        // genres: [Genre]
    },
    {
        id: "oidsfyssdfdsfy32234",
        name: "DeadPony",
        origin: "NewArc",
        members: [artists[2] as Artist, artists[1] as Artist],
        website: "https://dead2c.com"
        // genres: [Genre]
    },
    {
        id: "dsfsdfsdf22123",
        name: "DeadStatic",
        origin: "Minsk",
        members: [artists[0] as Artist, artists[2] as Artist],
        website: "https://deadcm232.com"
        // genres: [Genre]
    }
];