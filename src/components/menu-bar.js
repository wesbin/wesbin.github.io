import * as React from "react"
import clsx from "clsx"
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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

const MenuBar = ({ classes, data }) => {

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
