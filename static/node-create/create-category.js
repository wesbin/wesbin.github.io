const path = require(`path`)
/*
* 블로그 카테고리별 페이지 생성
* */
const MakeBlogCategory = async (graphql, createPage, reporter) => {
  const blogCategory = path.resolve('./src/templates/blog-category.js')
  const result = await graphql(
    `
    query CategoryQuery {
      site {
        siteMetadata {
          variable {
            pageScale
          }
        }
      }
      allMarkdownRemark {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
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

  const { site, allMarkdownRemark } = result.data;

  allMarkdownRemark.group.forEach(group => {
    const endPageNum = Math.ceil(group.totalCount / site.siteMetadata.variable.pageScale)
    for (let i = 1; i <= endPageNum; i++) {
      createPage({
        path: `/${group.fieldValue}/${i}`,
        component: blogCategory,
        context: {
          skip: (i - 1) * site.siteMetadata.variable.pageScale,
          currentPage: i,
          pageScale: site.siteMetadata.variable.pageScale,
          category: group.fieldValue
        }
      })
    }
  })
}

exports.make = MakeBlogCategory
