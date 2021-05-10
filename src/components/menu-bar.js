import * as React from "react"
import {
  makeStyles, Paper,
} from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import {Link} from "gatsby"

const useStyles = makeStyles((theme) => ({
  link: {
    'text-decoration': 'none'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
    boxShadow: `none`
  },
}))

const MenuBar = ({ data }) => {

  const classes = useStyles();
  const siteTitle = data.site.siteMetadata?.title || `wesbin`

  return (
    <Box>
      <AppBar position={`fixed`}
              color={`inherit`}
              className={classes.appBar}
      >
        <Toolbar
        >
          <Container maxWidth={`lg`}>
            <Grid container
                  item
                  xs={12}
                  lg={8}
            >
              <Grid item
                    xs={6}
              >
                <Typography variant="h6"
                            noWrap
                >
                  <Link to={`/`}
                        className={classes.link}
                  >
                      {siteTitle}
                  </Link>
                </Typography>
              </Grid>
              <Grid item
                    xs={6}
              >
                <Typography variant="h6"
                            noWrap
                            align={`right`}
                >
                  <Link to={`/about`}
                        className={classes.link}
                  >
                    ABOUT
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MenuBar
