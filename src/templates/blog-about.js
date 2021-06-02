import * as React from "react"
import { graphql } from "gatsby"
import {Box, Grid, Button, Divider} from '@material-ui/core'
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import MenuBar from "../components/menu-bar"
import Paper from "@material-ui/core/Paper"

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: theme.spacing(10),
  },
  titleLink: {
    paddingTop: theme.spacing(4)
  },
  body: {
    paddingTop: theme.spacing(8),
  },
  subTitle: {
    fontWeight: 'bold',
  },
  subBody: {
    marginTop: theme.spacing(2)
  },
  divider: {
    background: 'rgba(0, 0, 0, 0.87)',
    height: 2,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  projects: {
    marginBottom: theme.spacing(3)
  },
  projectTitle: {
    fontWeight: 'bold',
    marginRight: theme.spacing(2)
  },
  projectsBody: {
    marginTop: theme.spacing(2)
  }
}))

const BlogAbout = ({ data, location }) => {

  const classes = useStyles()
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Apple SD Gothic Neo",
        "Nanum Barun Gothic",
        "Nanum Gothic",
        "Verdana,Arial",
        "Malgun Gothic",
        "Dotum,sans-serif"
      ].join(",")
    }
  })

  return (
    <ThemeProvider theme={theme}>
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
                  <Grid container
                        direction={`column`}
                        className={classes.title}>
                    <Grid item>
                      <Paper elevation={0}>
                        <Typography variant={`h2`}>
                          안녕하세요<br />
                          개발자 위성빈입니다.
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid container
                          className={classes.titleLink}
                          alignItems={'center'}
                          direction={`column`}>
                      <Grid item>
                        <Button href="https://github.com/wesbin">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="" title="github">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Top #e */}
                  {/* Body #s */}
                  {/* Projects #s */}
                  <Grid container
                        className={classes.body}
                        direction={`column`}>
                    <Typography variant={`h4`}
                                className={classes.subTitle}>
                      Projects
                    </Typography>
                    <Divider className={classes.divider}/>
                    {/* Project 1 #s */}
                    <Grid container
                          className={classes.subBody}>
                      <Grid container
                            className={classes.projects}>
                        <Typography className={classes.projectTitle}
                                    variant={'h5'}>
                          뭐먹지(what-eat)
                        </Typography>
                        <Button href="https://github.com/wesbin/what-eat" target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="" title="github">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </Button>
                        <Button href="https://wesbin.github.io/what-eat/" target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" title="데모보기" className="">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </Button>
                        <Grid item
                              className={classes.projectsBody}>
                          <Typography>
                            뭘 먹을지 선택하지 못하는 사람을 위해 만든 메뉴 랜덤 추천 사이트입니다.
                            <br/>
                            <br/>
                            React, Node.js로 구현하였고, Github pages를 사용해 배포하였습니다.
                            추천 메뉴들을 관리하기 위해서 Github API를 사용하여 해당 Repository의 issue를 메뉴처럼 사용해보았습니다.
                            또한 Github API 사용 중에 CORS 문제를 해결하기 위해 Azure의 App service를 이용하여 Proxy 서버를 구성하였습니다.
                            <br/>
                            <br/>
                            추후에 모바일 기기의 편의성 향상을 위한 로그인 방식을 변경할 예정입니다. 또한 UI 개선의 가능성도 열어두고 있습니다.
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Project 1 #e */}
                    {/* Project 2 #s */}
                    <Grid container
                          className={classes.subBody}>
                      <Grid container
                            className={classes.projects}>
                        <Typography className={classes.projectTitle}
                                    variant={'h5'}>
                          우분투 패키지 스크래핑(ubuntu-package-scraping)
                        </Typography>
                        <Button href="https://github.com/wesbin/ubuntu-package-scraping" target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="" title="github">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </Button>
                        <Grid item
                              className={classes.projectsBody}>
                          <Typography>
                            오프라인으로 우분투 패키지를 업데이트하기 위해 만들었던 툴입니다.
                            우분투 패키지 사이트(<a>https://packages.ubuntu.com/</a>)에서 원하는 패키지와 해당 패키지와 연관된 모든 depends를 다운받게 됩니다.
                            <br/>
                            <br/>
                            Node.js를 이용해 구현하였습니다.
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Project 2 #e */}
                  </Grid>
                  {/* Projects #e */}
                  {/* Body #e */}
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
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
