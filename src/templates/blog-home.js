import * as React from "react"
import { graphql } from "gatsby"
import {Box, Grid, Paper, CssBaseline} from '@material-ui/core'

import MainList from "../components/main-list"
import MenuBar from "../components/menu-bar"
import SEO from "../pages"

const BlogHome = ({ data, location, pageContext }) => {
  console.log(`blog-home`)

  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    // todo Error 페이지
    return (
      <Grid container spacing={3}>
        <Grid item xs = {12}>
          <Paper>paper1</Paper>
        </Grid>
      </Grid>
    )
  }

  return (
    <Box display={`flex`}>
      <CssBaseline />
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

export default BlogHome

export const pageQuery = graphql`
  query PagingQuery(
    $skip: Int
    $pageScale: Int
    ){
    site {
      siteMetadata {
        title
        variable {
          pageScale
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $pageScale
      skip: $skip
      ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
      totalCount
    }
  }
`
