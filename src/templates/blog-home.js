import * as React from "react"
import { graphql } from "gatsby"
import {Box, Grid, Paper} from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import MainList from "../components/main-list"
import MenuBar from "../components/menu-bar"

const BlogHome = ({ data, location, pageContext }) => {

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

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Apple SD Gothic Neo",
        "Nanum Barun Gothic",
        "Nanum Gothic",
        "Verdana,Arial",
        "Malgun Gothic",
        "Dotum,sans-serif"
      ].join(",")
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Box display={`flex`}>
        {/*Left Menu #s*/}
        <MenuBar  data={data}
        />
        {/*Left Menu #e*/}
        {/*Main #s*/}
        <MainList data={data}
                  pageContext={pageContext}
        />
        {/*Main #e*/}
      </Box>
    </ThemeProvider>
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
