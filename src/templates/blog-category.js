import * as React from "react"
import { graphql } from "gatsby"

const BlogCategory = ({ data, location }) => {
  return (
    <div>
      Category
    </div>
  )
}

export default BlogCategory

export const pageQuery = graphql`
  query CategoryQuery {
    site {
      siteMetadata {
        title
        author {
          summary
          name
        }
        description
        siteUrl
      }
    }
  }
`
