import * as React from "react"
import { graphql } from "gatsby"
import {Box} from "@material-ui/core"

import MainList from "../components/main-list"
import MenuBar from "../components/menu-bar"

const BlogCategory = ({ data, location, pageContext }) => {
  return (
    <Box display={`flex`}>
      {/*Left Menu #s*/}
      <MenuBar data={data}
      />
      {/*Left Menu #e*/}
      {/*Main #s*/}
      <MainList data={data}
                pageContext={pageContext}
      />
      {/*Main #e*/}
    </Box>
  )
}

export default BlogCategory

export const pageQuery = graphql`
  query CategoryQuery (
    $skip: Int
    $pageScale: Int
    $category: String
  ){
    allMarkdownRemark(
      filter: {frontmatter: {category: {eq: $category}}}
      skip: $skip
      limit: $pageScale
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
        excerpt
        fields {
          slug
        }
      }
      totalCount
    }
    site {
      siteMetadata {
        title
        variable {
          pageScale
        }
      }
    }
  }
`
