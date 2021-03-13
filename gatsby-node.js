const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// 페이징 화면 생성
// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions
//
// }

// 각 글에 해당되는 페이지 생성
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  const blogHome = path.resolve('./src/templates/blog-home.js')


  /*
  *
  * 전체 페이지 갯수 만큼 구하고
  *
  * 페이지들을 리밋만큼 쪼개고
  *
  * 그것들을 합쳐서 페이지를 만든다
  *
  * 1) 전체 페이지 갯수
  *   전체 페이지 갯수만큼 반복문을 사용해서 createPage 를 실행한다.
  *   blog-home 에서 index 를 받아서 graphql 의 skip 의 인자로 사용해 페이지를 만든다.
  *
  * */

  const result2 = await graphql(
    `
    query TotalCountQuery {
      allMarkdownRemark {
        totalCount
      }
    }
    `
  )

  if (result2.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result2.errors
    )
    return
  }

  const totalCnt = result2.data.allMarkdownRemark.totalCount

  for (let i = 2; i <= Math.ceil(totalCnt/5); i++) {
    createPage({

      path: `/page/${i}/`,
      component: blogHome,
      context: {
        skip: (i - 1) * 5
      }
    })
  }
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
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
