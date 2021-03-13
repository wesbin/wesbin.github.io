import * as React from "react"
import { Link, graphql } from "gatsby"
import { Box, Container, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import {Pagination, PaginationItem} from '@material-ui/lab'


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  link: {
    'text-decoration': 'none'
  },
}))

const BlogHome = ({ data, location }) => {
  const classes = useStyles();

  const posts = data.allMarkdownRemark.nodes
  const currentPage = data.allMarkdownRemark.pageInfo.currentPage


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
          <Pagination page={currentPage} count={10} renderItem={(item) => (
            <PaginationItem component={Link}
                            to={`${item.page === 1 ? '/' : `/page/${item.page}`}`}
                            {...item}
            />
          )}/>
        </Box>
        {/*Page Bar#e*/}
      </Container>
      {/*Body #e*/}
    </Box>
  )
}

export default BlogHome

export const pageQuery = graphql`
  query PagingQuery($skip: Int){
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
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
      pageInfo {
        currentPage
      }
    }
  }
`
