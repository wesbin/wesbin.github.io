import * as React from "react"
import { graphql } from "gatsby"
import { Box, Grid, Paper, CssBaseline } from '@material-ui/core';

import MainList from "../components/main-list"
import MenuBar from "../components/menu-bar"
import InfoBottom from "../components/info-bottom"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {

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
      <SEO title={"Home"}/>
      {/*Left Menu #s*/}
      <MenuBar data={data}
      />
      {/*Left Menu #e*/}
      {/*Main #s*/}
      <MainList data={data}
      />
      {/*Footer #s*/}

      {/*Footer #e*/}
      {/*Main #e*/}
    </Box>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
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
      limit: 15
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
