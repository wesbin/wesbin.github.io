import * as React from "react"
import {Box, Container, Grid, Paper, Typography} from "@material-ui/core"
import {Link} from "gatsby"
import {Pagination, PaginationItem} from "@material-ui/lab"

const MainList = ({ classes, data }) => {

  const posts = data.allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount
  const siteVariable = data.site.siteMetadata.variable
  const currentPage = data.allMarkdownRemark.pageInfo.currentPage

  return (
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
                  {/*<Link to={post.fields.slug} className={classes.link}>*/}
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
        <Pagination page={currentPage}
                    count={Math.ceil(totalCount / siteVariable.pageScale)}
                    renderItem={(item) => (
                      <PaginationItem component={Link}
                                      to={`${item.page === 1 ? '/' : `/page/${item.page}`}`}
                                      {...item}
                      />)
                    }
        />
      </Box>
      {/*Page Bar#e*/}
    </Container>
  )
}

export default MainList
