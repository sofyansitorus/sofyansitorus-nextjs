export interface iCompany {
    companyName: string;
    companyWebsite?: string;
    companyDescription?: string;
    companyLocation?: string;
    isRemoteWork?: boolean;
}

export interface iJob {
    jobTitle: string;
    jobDescription?: string;
    jobDuties?: string[];
    jobAchievements?: string[];
    jobSkills?: string[];
}

export interface Employment extends iCompany, iJob {
    dateStart: Date;
    dateEnd: Date | 'present';
}

export const employments: Employment[] = [
    {
        dateStart: new Date('Mar 2018'),
        dateEnd: 'present',
        jobTitle: 'Web Developer',
        companyName: 'Elegant Themes',
        companyWebsite: 'https://www.elegantthemes.com/',
        companyDescription:
            'Elegant Themes is a leader in WordPress Theme and Plugin creator that has been building the top premium WordPress themes for the past 11 years, and have one of the largest customer bases in the market with more than 600K customers.',
        companyLocation: 'CA, United States',
        jobDuties: [
            'Developing new features for Divi theme',
            'Software maintenance across the Divi theme codebase',
            'Reviewing Pull Requests from the development team',
        ],
        jobSkills: ['PHP', 'JavaScript', 'MySQL', 'CSS', 'HTML', 'React', 'WordPress', 'WooCommerce'],
        isRemoteWork: true,
    },
    {
        dateStart: new Date('Aug 2017'),
        dateEnd: new Date('Feb 2018'),
        jobTitle: 'Backend Developer',
        companyName: 'Eurecah',
        companyWebsite: 'https://www.eurecah.com/',
        companyDescription:
            'Eurecah is a startup company based in Florida, US. Eurecah running a multi-vendor online marketplace platform that selling fashion and accessories goods for the Colombia market.',
        companyLocation: 'FL, United States',
        jobDuties: [
            'Architect and develop RESTful API server',
            'Implement continuous integration and continuous deployment',
            'Setup and maintenance web server',
        ],
        jobSkills: ['Workflow Optimization', 'Database Design', 'RESTful WebServices', 'Server Administration'],
        isRemoteWork: true,
    },
    {
        dateStart: new Date('Jan 2017'),
        dateEnd: new Date('Jul 2017'),
        jobTitle: 'WordPress Developer',
        companyName: 'Artbees',
        companyWebsite: 'https://artbees.net/',
        companyDescription:
            'Artbees is an independent digital company based in Istanbul, Turkey. Artbees awarded the "Power Elite Author" badge and listed in the "Top 10 Authors" in ThemeForest marketplace.',
        companyLocation: 'Istanbul, Turkey',
        jobDuties: [
            'Developing new features for Jupiter theme',
            'Software maintenance across the Jupiter theme codebase',
        ],
        jobSkills: ['PHP', 'JavaScript', 'MySQL', 'CSS', 'HTML', 'WordPress', 'WooCommerce'],
        isRemoteWork: true,
    },
    {
        dateStart: new Date('Nov 2014'),
        dateEnd: new Date('Dec 2016'),
        jobTitle: 'WordPress Developer',
        companyName: 'Calibreworks',
        companyWebsite: 'https://calibreworks.com/',
        companyDescription:
            'Calibreworks is a web development agency based in Jakarta, Indonesia. Calibreworks has been serving clients globally since 2012 specializing in custom WordPress web design & development.',
        companyLocation: 'Jakarta, Indonesia',
        jobDuties: [
            'Converting design into a fully functional WordPress themes and plugins',
            'Supervise and mentoring subordinates in development and technical progression',
        ],
        jobSkills: ['PHP', 'JavaScript', 'MySQL', 'CSS', 'HTML', 'WordPress', 'WooCommerce'],
    },
    {
        dateStart: new Date('Sep 2013'),
        dateEnd: new Date('Aug 2014'),
        jobTitle: 'Web Developer',
        companyName: 'iClick Media',
        companyWebsite: 'https://www.iclickmedia.com.sg/',
        companyDescription:
            'iClick Media is a web development agency based in Singapore. Established since 2009, iClick Media offering wide range of digital services such as Web Design, Web Development, Internet Marketing, Search Engine Optimization.',
        companyLocation: 'Singapore',
        jobDuties: [
            'Converting design into a fully functional WordPress themes and plugins',
            'Converting design into a fully functional Joomla theme and extensions',
            'Converting design into a fully functional Opencart theme and extensions',
        ],
        jobSkills: ['PHP', 'JavaScript', 'MySQL', 'CSS', 'HTML', 'WordPress', 'Joomla', 'Opencart'],
    },
    {
        dateStart: new Date('Jun 2011'),
        dateEnd: new Date('Aug 2013'),
        jobTitle: 'Web Developer',
        companyName: 'ATN Prime Solutions',
        companyWebsite: 'https://www.atn.com.sg/',
        companyDescription:
            'ATN Prime Solutions is a private company based in Singapore that offering Feng Shui sourcing products and consulting services.',
        companyLocation: 'Singapore',
        jobDuties: ['Maintenance Opencart based e-commerce web application', 'Setup and maintenance Web Server'],
        jobSkills: ['PHP', 'JavaScript', 'MySQL', 'CSS', 'HTML', 'Opencart', 'Server Administration'],
    },
];
