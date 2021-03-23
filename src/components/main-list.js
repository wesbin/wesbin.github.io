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
  ListItemText, makeStyles,
} from "@material-ui/core"
import {Link} from "gatsby"
import {Pagination, PaginationItem} from "@material-ui/lab"
// import useStyles from "../hooks/styles"
import GetCategory from "../hooks/GetCategory"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  link: {
    'text-decoration': 'none'
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
    boxShadow: `none`
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function ListItemLink(props) {
  return <ListItem button component={`a`} {...props} />
}

const MainList = ({ data, pageContext }) => {

  const classes = useStyles()
  const posts = data.allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount
  const siteVariable = data.site.siteMetadata.variable
  const currentPage = pageContext ? pageContext.currentPage : 1
  const categoryList = GetCategory();

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
                      {
                        categoryList.map(category => {
                          return (
                            <ListItem button key={category.fieldValue}>
                              <ListItemText primary={`${category.fieldValue}(${category.totalCount})`} />
                            </ListItem>
                          )
                        })
                      }
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
