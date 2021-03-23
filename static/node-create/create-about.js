const path = require(`path`)
/*
* About 페이지 생성
* */
const MakeBlogAbout = async (graphql, createPage, reporter) => {
  const blogAbout = path.resolve(`./src/templates/blog-about.js`)

  createPage({
    path: `/about`,
    component: blogAbout,
    context: {

    }
  })
}

exports.make = MakeBlogAbout
