import * as React from "react"
import { graphql } from "gatsby"

import MenuBar from "../components/menu-bar"
import {makeStyles} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

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

const BlogPostTemplate = ({ data, location }) => {
  const classes = useStyles();

  const post = data.markdownRemark
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  // const { previous, next } = data

  return (
    <Box display={`flex`}>
      {/*Left Menu #s*/}
      <MenuBar classes={classes}
               data={data}
      />
      {/*Left Menu #e*/}
      {/*Main #s*/}
      <Box width={`100%`}>
        {/*Body #s*/}
        <Container maxWidth={`lg`}>
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
          </Box>
        </Container>
        {/*Body #e*/}
      </Box>
      {/*Main #e*/}
    </Box>
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
