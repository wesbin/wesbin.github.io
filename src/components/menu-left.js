import * as React from "react"
import clsx from "clsx"
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  EmojiPeople as EmojiPeopleIcon,
  Home as HomeIcon
} from "@material-ui/icons"

const MenuLeft = ({ classes }) => {
  const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const handleDrawerToggle = () => {
    open ? setOpen(false) : setOpen(true)
  };

  return (
    <div>
      {/*<AppBar*/}
      {/*position="fixed"*/}
      {/*className={clsx(classes.appBar, {*/}
      {/*[classes.appBarShift]: open,*/}
      {/*})}*/}
      {/*>*/}
      {/*<Toolbar>*/}
      {/*<IconButton*/}
      {/*color="inherit"*/}
      {/*aria-label="open drawer"*/}
      {/*onClick={handleDrawerOpen}*/}
      {/*edge="start"*/}
      {/*className={clsx(classes.menuButton, {*/}
      {/*[classes.hide]: open,*/}
      {/*})}*/}
      {/*>*/}
      {/*<MenuIcon />*/}
      {/*</IconButton>*/}
      {/*<Typography variant="h6" noWrap>*/}
      {/*Mini variant drawer*/}
      {/*</Typography>*/}
      {/*</Toolbar>*/}
      {/*</AppBar>*/}
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
            { open ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
          </IconButton>
        </div>
        {/*Open Icon #e*/}
        <Divider />
        {/*First Section #s*/}
        <List>
          <ListItem button key={`Home`}>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary={`Home`} />
          </ListItem>
          <ListItem button key={`About`}>
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
    </div>
  )
}

export default MenuLeft
