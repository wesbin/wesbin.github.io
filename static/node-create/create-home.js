const path = require(`path`)
/*
* 블로그 포스트 리스트 페이지 생성
* */
const MakeBlogHome = async (graphql, createPage, reporter) => {
  const blogHome = path.resolve('./src/templates/blog-home.js')
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
      `There was an error loading your blog home`,
      result.errors
    )
    return
  }

  const totalCnt = result.data.allMarkdownRemark.totalCount
  const siteVariable = result.data.site.siteMetadata.variable
  const endPageNum = Math.ceil(totalCnt / siteVariable.pageScale);

  for (let i = 2; i <= endPageNum; i++) {
    createPage({
      path: `/page/${i}/`,
      component: blogHome,
      context: {
        skip: (i - 1) * siteVariable.pageScale,
        currentPage: i,
        pageScale: siteVariable.pageScale
      }
    })
  }
}

exports.make = MakeBlogHome
