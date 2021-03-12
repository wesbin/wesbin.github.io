import * as React from "react"
import { Link, graphql } from "gatsby"

import { Box, Container, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  link: {
    'text-decoration': 'none'
  },
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
      <Container maxWidth="lg">
        <Box>
          <Grid container
                // component={`header`}
                spacing={0}
                justify={`center`}
                alignItems={`flex-start`}
          >
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography>menu</Typography>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Typography>title</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/*Header #e*/}
      {/*Body #s*/}
      <Container maxWidth="lg">
        {/*Post List #s*/}
        <Box paddingTop={10}>
          <Grid container
                spacing={3}
                direction={`column`}
          >
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug

              return (
                <Grid item key={post.fields.slug}>
                  <Link to={post.fields.slug} className={classes.link}>
                    <Paper className={classes.paper} variant={`outlined`}>
                      <Typography variant={`h5`}>{title}</Typography>
                      <Typography>{post.frontmatter.description || post.excerpt}</Typography>
                      <Typography color={`textSecondary`}>{post.frontmatter.date }</Typography>
                    </Paper>
                  </Link>
                </Grid>
              )
            })}
          </Grid>
        </Box>
        {/*Post List #e*/}
        {/*Page Bar#s*/}
        <Box paddingTop={5}
             display={`flex`}
             justifyContent={`center`}
        >
          <Pagination count={10}
                      onChange={(event, pageNum) => console.log(pageNum)}

          />
        </Box>
        {/*Page Bar#e*/}
      </Container>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
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
    }
  }
`
