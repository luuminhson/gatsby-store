'use strict';

module.exports = {
    siteUrl: 'https://originalinside.com',
    title: 'Original Inside',
    description: 'Some scattered notes of someone.',
    copyright: 'Original Inside © All rights reserved.',
    postsPerPage: 10,
    googleAnalyticsId: '',
    menu: [
        {
            label: 'Home',
            path: '/'
        },
        {
            label: 'Store',
            path: '/store'
        },
        {
            label: 'Blog',
            path: '/blog'
        },
        {
            label: 'About',
            path: '/about'
        }
    ],
    logo: {
        src: {
            dark: '/logo-dark.svg',
            light: '/logo-light.svg'
        },
        alt: 'Miso Product Design',
        text: 'Miso',
        type: 'img' // 'img' for image logo or whatever string for text logo
    },
    contacts: {
        phone: '+84934410491',
        email: 'hello@originalinside.com',
        facebook: 'original.inside',
        instagram: 'original.inside',
    }
};
