import * as React from "react"
import clsx from "clsx"
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, makeStyles,
} from "@material-ui/core"
import {
  ChevronLeft as ChevronLeftIcon,
  EmojiPeople as EmojiPeopleIcon,
  Home as HomeIcon,
  Menu as MenuIcon
} from "@material-ui/icons"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
// import useStyles from "../hooks/styles"

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

const MenuBar = ({ data }) => {

  const classes = useStyles();
  const siteTitle = data.site.siteMetadata?.title || `wesbin`
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const handleDrawerToggle = () => {
    open ? setOpen(false) : setOpen(true)
  };

  return (
    <Box>
      <AppBar position={`fixed`}
              color={`inherit`}
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
          <MenuIcon />
          </IconButton>
        <Typography variant="h6" noWrap>
          {siteTitle}
        </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {/*Open Icon #s*/}
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerToggle}>
            { open ? <ChevronLeftIcon /> : `` }
          </IconButton>
        </div>
        {/*Open Icon #e*/}
        {/*First Section #s*/}
        <List>
          <ListItem button
                    key={`Home`}
                    component={`a`}
                    href={`/`}
          >
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary={`Home`} />
          </ListItem>
          <ListItem button
                    key={`About`}
                    component={`a`}
                    href={`/about`}
          >
            <ListItemIcon>
              <EmojiPeopleIcon/>
            </ListItemIcon>
            <ListItemText primary={`About`} />
          </ListItem>
        </List>
        {/*First Section #e*/}

        {/*<Divider />*/}
        {/*Second Section #s*/}
        {/*<List>*/}
        {/*{['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
        {/*<ListItem button key={text}>*/}
        {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
        {/*<ListItemText primary={text} />*/}
        {/*</ListItem>*/}
        {/*))}*/}
        {/*</List>*/}
        {/*Second Section #e*/}

      </Drawer>
    </Box>
  )
}

export default MenuBar
