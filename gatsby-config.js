module.exports = {
  siteMetadata: {
    title: `wesbin`,
    author: {
      name: `wesbin`,
      summary: `just playing!`,
    },
    description: `wesbin blog`,
    siteUrl: `https://wesbin.github.io/`,
    variable: {
      pageScale: 15 // index 의 pageQuery limit 도 같이 변경해줘야 한다.
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-transformer-remark`,
            options: {
              // In your gatsby-transformer-remark plugin array
              plugins: [{
                resolve: 'gatsby-remark-emojis',
                options: {
                  // Deactivate the plugin globally (default: true)
                  active : true,
                  // Add a custom css class
                  class  : 'emoji-icon',
                  // In order to avoid pattern mismatch you can specify
                  // an escape character which will be prepended to the
                  // actual pattern (e.g. `#:poop:`).
                  escapeCharacter : '#', // (default: '')
                  // Select the size (available size: 16, 24, 32, 64)
                  size   : 64,
                  // Add custom styles
                  styles : {
                    display      : 'inline',
                    margin       : '0',
                    'margin-top' : '1px',
                    position     : 'relative',
                    top          : '5px',
                    width        : '25px'
                  }
                }
              }]
            }
          }
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://wesbin.github.io/`,
        sitemap: `https://wesbin.github.io/sitemap.xml`,
        policy: [
          {
            userAgent: `*`,
            allow: `/`
          }
        ]
      }
    },
  ],
}
