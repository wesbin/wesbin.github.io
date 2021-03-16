import * as React from "react"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import {Link} from "gatsby"
import {Pagination, PaginationItem} from "@material-ui/lab"

function ListItemLink(props) {
  return <ListItem button component={`a`} {...props} />
}

const MainList = ({ classes, data, pageContext }) => {

  const posts = data.allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount
  const siteVariable = data.site.siteMetadata.variable
  const currentPage = pageContext ? pageContext.currentPage : 1

  return (
    <Box width={`100%`}>
      <Container maxWidth="lg">
        <Box paddingTop={10}>
          <Grid container
                spacing={3}
          >
            {/*Post List #s*/}
            <Grid container
                  item
                  xs={12}
                  lg={8}
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
            {/*Post List #e*/}
            {/*Category #s*/}
            <Grid container
                  item
                  xs={12}
                  lg={4}
                  spacing={3}
            >
              <Grid item
                    xs={12}
              >
                <Card variant={`outlined`}>
                  <CardHeader title={`Category`}
                  />
                  <CardContent>
                    <List component={`nav`}>
                      <ListItem button>
                        <ListItemText primary={`Sample1`} />
                      </ListItem>
                      <ListItemLink href={`/page/2`}>
                        <ListItemText primary={`Sample2`}/>
                      </ListItemLink>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {/*Category #e*/}
          </Grid>
        </Box>
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
    </Box>
  )
}

export default MainList
