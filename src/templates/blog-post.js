import * as React from "react"
import { graphql } from "gatsby"

import MenuBar from "../components/menu-bar"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import SEO from "../components/seo"
import Utterances from '../hooks/Utterances'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  // const { previous, next } = data

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
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        {/*Left Menu #s*/}
        <MenuBar data={data}
        />
        {/*Left Menu #e*/}
        {/*Main #s*/}
        <Box width={`100%`}>
          {/*Body #s*/}
          <Container maxWidth={`md`}>
            <Box paddingTop={10}>
              <Grid container
              >
                <Grid item>
                  <article
                    className="blog-post"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h1 itemProp="headline">{post.frontmatter.title}</h1>
                      <p>{post.frontmatter.date}</p>
                    </header>
                    <section
                      dangerouslySetInnerHTML={{ __html: post.html }}
                      itemProp="articleBody"
                    />
                    <hr />
                  </article>
                </Grid>
              </Grid>
              <Utterances />
            </Box>
          </Container>
          {/*Body #e*/}
        </Box>

        {/*Main #e*/}
      </Box>
    </ThemeProvider>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
