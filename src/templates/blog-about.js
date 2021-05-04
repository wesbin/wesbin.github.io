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
    paddingTop: 80
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
                    direction={`column`}
              >
                {/* Top #s */}
                <Grid item
                >
                  <Paper className={classes.titlePaper}
                         elevation={0}
                         >
                    <Typography variant={`h2`}>
                      안녕하세요<br />
                      개발자 위성빈입니다.
                    </Typography>
                    {/*<Typography variant={`h6`}>*/}
                      {/*즐겁게 짠 코드 한줄이 누군가에게 즐거움을 안겨줄 때*/}
                    {/*</Typography>*/}
                  </Paper>
                </Grid>
                {/* Top #e */}
                {/* Body #s */}
                <Grid container>
                  <Typography variant={`h4`}>Projects</Typography>
                  <Grid container>
                    <Typography variant={'h6'}>what-eat</Typography>
                    <Grid item>
                      React, Node.js를 사용해 만든 메뉴 추천 사이트입니다.
                      Github pages를 사용하여 배포하였고, 해당 Repository의 issues를 Github API를 사용하여 메뉴를 관리했습니다.
                      또한 Github API 사용 중에 CORS 문제를 해결하기 위해 Azure의 App service를 이용하여 Proxy 서버를 구성하였습니다.
                      <br/>
                      <br/>
                      추후에 모바일 기기의 편의성 향상을 위한 로그인 방식을 변경할 예정입니다. 또한 UI 개선의 가능성도 열어두고 있습니다.
                    </Grid>
                  </Grid>
                </Grid>
                {/* Body #e */}
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
