import * as React from "react"
import { graphql } from "gatsby"
import {Box, Grid} from '@material-ui/core'
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import MenuBar from "../components/menu-bar"
import Paper from "@material-ui/core/Paper"

import {makeStyles} from "@material-ui/core"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  titlePaper: {
    paddingTop: 40
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

const BlogAbout = ({ data, location }) => {

  const classes = useStyles()

  return (
    <Box display={`flex`}>
      {/*Left Menu #s*/}
      <MenuBar data={data}
      />
      {/*Left Menu #e*/}
      <Box width={`100%`}>
        <Container maxWidth={`md`}>
          <Box paddingTop={10}>
            <Grid container
                  spacing={3}
            >
              <Grid container
                    item
                    xs={12}
                    spacing={3}
                    direction={`column`}
              >
                <Grid item
                >
                  <Paper className={classes.titlePaper}
                         elevation={0}
                  >
                    <Typography variant={`h3`}>안녕하세요</Typography>
                    <Typography variant={`h4`}>개발자 위성빈입니다.</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default BlogAbout

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        author {
          summary
          name
        }
        description
        siteUrl
      }
    }
  }
`
