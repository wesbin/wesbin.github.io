const path = require(`path`)
/*
* 블로그 카테고리별 페이지 생성
* */
const MakeBlogCategory = async (graphql, createPage, reporter) => {
  const blogCategory = path.resolve('./src/templates/blog-category.js')
  const result = await graphql(
    `
    query TotalCountQuery {
      site {
        siteMetadata {
          variable {
            pageScale
          }
        }
      }
      allMarkdownRemark {
        totalCount
      }
    }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog category`,
      result.errors
    )
    return
  }

  createPage({
    path: '',
    component: blogCategory,
    context: {

    }
  })
}

exports.make = MakeBlogCategory
