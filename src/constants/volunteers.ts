interface Volunteer {
    dateStart: Date;
    dateEnd?: Date | 'present';
    organization: string;
    role: string;
    description: string;
    cause?: string;
    link?: string;
}

export const volunteers: Volunteer[] = [
    {
        dateStart: new Date('Feb 2019'),
        organization: 'WordCamp Jakarta 2019',
        role: 'Organizer',
        description:
            'Participated in the planning and preparation of WordCamp Jakarta 2019 event. Held a volunteer position as a web developer to build the WordCamp event official website.',
        link: 'https://2019.jakarta.wordcamp.org',
        cause: 'Science and Technology',
    },
    {
        dateStart: new Date('Nov 2017'),
        organization: 'WordCamp Jakarta 2017',
        role: 'Organizer',
        description:
            'Participated in the planning and preparation of WordCamp Jakarta 2017 event. Held a volunteer position as a web developer to build the WordCamp event official website.',
        link: 'https://2017.jakarta.wordcamp.org',
        cause: 'Science and Technology',
    },
    {
        dateStart: new Date('Dec 2016'),
        dateEnd: 'present',
        organization: 'WordPress Meetup Bekasi',
        role: 'Organizer',
        description: 'Have been helping run local WordPress meet-ups in Bekasi, Indonesia.',
        link: 'https://www.meetup.com/Bekasi-WordPress-Meetup/',
        cause: 'Science and Technology',
    },
];
