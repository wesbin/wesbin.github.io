import * as React from "react"
import { Link, graphql } from "gatsby"

import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  typo: {
    align: 'left'
  }
}))

const BlogIndex = ({ data, location }) => {
  const classes = useStyles();

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Grid container spacing={3}>
        <Grid item xs = {12}>
          <Paper>paper1</Paper>
        </Grid>
      </Grid>
    )
  }

  return (
    <Box>
      {/*Header #s*/}
      <Box>
        <Container maxWidth="lg">
          <Grid component={`header`} container spacing={0} justify={`center`} alignItems={`flex-start`}>
            <Grid item xs={2}>
              <Paper className={classes.paper}>menu</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>title</Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/*Header #e*/}
      {/*Body #s*/}
      <Box m={3}>
        <Container maxWidth="lg">

          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <Link to={post.fields.slug}>
                <Grid
                  key={post.fields.slug}
                  container spacing={3}
                  direction={`column`}
                  justify={`flex-start`}
                  alignItems={`stretch`}>
                  <Grid item xs>
                    <Paper className={classes.paper}>
                      <Typography align={`left`} variant={`h5`}>{title}</Typography>
                      <Typography align={`left`}>{post.frontmatter.description || post.excerpt}</Typography>
                      <Typography align={`left`} color={`textSecondary`}>{post.frontmatter.date }</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Link>
            )
          })}
        </Container>
      </Box>
      {/*Body #e*/}
    </Box>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
    }
  }
`
