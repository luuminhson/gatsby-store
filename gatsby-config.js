require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://originalinside.com',
    title: 'Original Inside',
    description: 'Because you are original.'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/`)
      }
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: 'original-inside',
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        paginationSize: 100,
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby Store',
        short_name: 'Gatsby Store',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'static/android-chrome-512x512.png'
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-93349937-6',
        respectDNT: true
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: [
            'Fira Sans Condensed:n4,n5,n6',
            'Source Sans Pro:n4,i4,n6,i6,n7,i7'
          ],
          urls: [
            'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i,700,700i|Fira+Sans+Condensed:400,500,600&display=swap&subset=latin-ext,vietnamese',
          ],
        },
      }
    }
  ]
};
