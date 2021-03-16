import * as React from "react"
import { graphql } from "gatsby"
import {Box, Grid, Paper, makeStyles, CssBaseline} from '@material-ui/core'

import MainList from "../components/main-list"
import MenuBar from "../components/menu-bar"

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

const BlogHome = ({ data, location, pageContext }) => {
  const classes = useStyles();

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
      <MenuBar classes={classes}
               data={data}
      />
      {/*Left Menu #e*/}
      {/*Main #s*/}
      <MainList classes={classes}
                data={data}
                pageContext={pageContext}
      />
      {/*Main #e*/}
    </Box>
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
