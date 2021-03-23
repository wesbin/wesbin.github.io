const { createFilePath } = require(`gatsby-source-filesystem`)

const BlogAbout = require('./static/node-create/create-about')
const BlogIndex = require('./static/node-create/create-index')
const BlogHome = require('./static/node-create/create-home')


exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  await BlogIndex.make(graphql, createPage, reporter)
  await BlogAbout.make(graphql, createPage, reporter)
  await BlogHome.make(graphql, createPage, reporter)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
      summary: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      category: String
    }

    type Fields {
      slug: String
    }
  `)
}
