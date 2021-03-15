import * as React from "react"
import { Container, Grid, Paper, Typography } from "@material-ui/core"

const TitleBar = ({ classes, siteTitle }) => {

  return (
    <Container maxWidth="lg">
      <Grid container
            spacing={0}
            justify={`center`}
            alignItems={`flex-start`}
      >
        {/*<Grid item xs={2}>*/}
        {/*<Paper className={classes.paper}>*/}
        {/*</Paper>*/}
        {/*</Grid>*/}
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography>{siteTitle}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TitleBar
