import * as React from "react"
import { graphql } from "gatsby"
import {Box, Grid, Paper, makeStyles, CssBaseline} from '@material-ui/core'

import TitleBar from "../components/title-bar"
import MainList from "../components/main-list"
import MenuLeft from "../components/menu-left"

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

const BlogHome = ({ data, location }) => {
  const classes = useStyles();

  const siteTitle = data.site.siteMetadata?.title || `Title`
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
      <MenuLeft classes={classes} />
      {/*Left Menu #e*/}
      {/*Main #s*/}
      <Box width={`100%`}>
        {/*Header #s*/}
        <TitleBar siteTitle={siteTitle}
                  classes={classes}
        />
        {/*Header #e*/}
        {/*Body #s*/}
        <MainList classes={classes}
                  data={data}
        />
        {/*Body #e*/}
      </Box>
      {/*Main #e*/}
    </Box>
  )
}

export default BlogHome

export const pageQuery = graphql`
  query PagingQuery($skip: Int){
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
      totalCount
    }
  }
`
