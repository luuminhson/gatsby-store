'use strict';

module.exports = {
    siteUrl: 'https://oicakery.com',
    title: 'Bánh Ổi',
    subtitle: 'Happiness is homemade',
    description: 'Bánh Ổi là một cửa hàng nhỏ bán các loại bánh nhà làm. Ăn bánh khi vui, khi buồn và khi biết mình còn có thể sẻ chia.',
    copyright: 'Oi Cakery © All rights reserved.',
    postsPerPage: 5,
    googleAnalyticsId: '',
    menu: [
        {
            label: 'Trang chủ',
            path: '/',
        },
        {
            label: 'Bánh',
            path: '/products',
            // submenu: 'productCategories'
            submenu: 'none' // At least one menu must have submenu value
        },
        // {
        //     label: 'Collections',
        //     path: '/products/collection',
        //     submenu: 'productCollections'
        // },
        {
            label: 'Blog',
            path: '/blog',
        },
        {
            label: 'Giới thiệu',
            path: '/about',
        }
    ],
    botNav: [
        {
            icon: 'oi-icon-home',
            label: 'Trang chủ',
            path: '/'
        },
        {
            icon: 'oi-icon-store',
            label: 'Bánh',
            path: '/products'
        },
        {
            icon: 'oi-icon-cart',
            label: 'Giỏ hàng',
            path: '/cart'
        },
        {
            icon: 'oi-icon-blog',
            label: 'Blog',
            path: '/blog'
        },
        {
            icon: 'oi-icon-menu',
            label: 'Thông tin',
            path: '/more'
        }
    ],
    contacts: {
        phone: '+84934410491',
        email: 'hello@oicakery.com',
        // facebook: 'banh.oi',
        instagram: 'banh.oi',
    }
};
