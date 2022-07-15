interface Project {
    dateStart: Date;
    dateEnd?: Date;
    name: string;
    company?: string;
    product?: string;
    type: string;
    role: string;
    description: string;
    link?: string;
    category?: string;
}

export const projects: Project[] = [
    {
        dateStart: new Date('Dec 2018'),
        name: 'Quick Actions',
        company: 'Elegant Themes',
        product: 'Divi Theme',
        type: 'New Feature Development',
        role: 'Feature Owner',
        description:
            "Quick Actions, an incredible new way to use Divi. Quick Actions is the Divi enthusiast's secret weapon. It allows you to do anything, go anywhere and find what you need within the Divi Builder and on your WordPress website with incredible speed.",
        link: 'https://www.elegantthemes.com/blog/theme-releases/the-incredible-new-divi-quick-actions',
    },
    {
        dateStart: new Date('Sep 2018'),
        name: 'Extend Styles',
        company: 'Elegant Themes',
        product: 'Divi Theme',
        type: 'New Feature Development',
        role: 'Feature Owner',
        description:
            'Extend Styles is a brand new feature for Divi that expands upon some of its most unique and useful innovations. Extend Styles allows you to take any customized style and extend it throughout the page, or to specific elements within specific locations with the click of a button. What could normally take hours can now be accomplished in just a few seconds.',
        link: 'https://www.elegantthemes.com/blog/theme-releases/build-divi-pages-faster-than-ever-before-introducing-extend-styles',
    },
    {
        dateStart: new Date('Jul 2018'),
        name: 'Find And Replace',
        company: 'Elegant Themes',
        product: 'Divi Theme',
        type: 'New Feature Development',
        role: 'Feature Owner',
        description:
            'Find and Replace including full page batch editing for Divi. This new feature allows you to make sweeping changes across your entire page instantly, saving you hours upon hours of editing time with the click of a button.',
        link: 'https://www.elegantthemes.com/blog/theme-releases/find-and-replace',
    },
    {
        dateStart: new Date('Jun 2018'),
        name: 'Page Creation Workflow',
        company: 'Elegant Themes',
        product: 'Divi Theme',
        type: 'New Feature Development',
        role: 'Feature Owner',
        description:
            'Page creation workflow to the Visual Builder that makes it even easier to get new websites up and running quickly. Now, when you create a new page in Divi, you will be greeted by three page creation options.',
        link: 'https://www.elegantthemes.com/blog/theme-releases/divi-feature-update-the-new-builder-page-creation-workflow',
    },
    {
        dateStart: new Date('Aug 2019'),
        name: 'Responsive & Hover Content',
        company: 'Elegant Themes',
        product: 'Divi Theme',
        type: 'New Feature Development',
        role: 'Feature Owner',
        description:
            'Responsive & Hover Content is a brand new feature for Divi Theme that allows you to serve different content to visitors based on which device they are using to browse your website, giving you even more fine tuned control over your responsive designs.',
        link: 'https://www.elegantthemes.com/blog/theme-releases/responsive-editing-hover-editing-for-divi',
    },
    {
        dateStart: new Date('Jan 2018'),
        name: 'Woongkir',
        type: 'WordPress Plugin',
        role: 'Plugin Author',
        description:
            'Responsive & Hover Content is a brand new feature for Divi Theme that allows you to serve different content to visitors based on which device they are using to browse your website, giving you even more fine tuned control over your responsive designs.',
        link: 'https://www.elegantthemes.com/blog/theme-releases/responsive-editing-hover-editing-for-divi',
    },
    {
        dateStart: new Date('Jan 2018'),
        name: 'WooReer',
        type: 'WordPress Plugin',
        role: 'Plugin Author',
        description:
            'Responsive & Hover Content is a brand new feature for Divi Theme that allows you to serve different content to visitors based on which device they are using to browse your website, giving you even more fine tuned control over your responsive designs.',
        link: 'https://www.elegantthemes.com/blog/theme-releases/responsive-editing-hover-editing-for-divi',
    },
];
