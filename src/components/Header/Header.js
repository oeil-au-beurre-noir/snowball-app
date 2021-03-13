import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import WbSunny from '@material-ui/icons/WbSunny';
import NightsStay from '@material-ui/icons/NightsStay';

import styles from './styles';

const useStyles = makeStyles(styles);

const Header = ({ links, isNightMode, setNightMode }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar className={`${classes.appBar} ${classes.dark}`}>
      <Toolbar className={classes.container}>
        <Button href="/" className={classes.title}>
          <Hidden xsDown>
            {/* need to fix the logo to became white in darkmode */}
            <img
              alt="SNOB"
              src={require(`images/single-assets/snowball_logo.svg`)}
              height={'40px'}
              className={classes.logo}
            />
          </Hidden>
          <Hidden smUp>
            <img
              alt="SNOB"
              src={require(`images/single-assets/snowball.svg`)}
              height={'35px'}
              className={classes.logo}
            />
          </Hidden>
        </Button>

        <Hidden mdDown>
          {renderLink('', 'Home', classes)}
          {renderLink('snowglobe', 'SnowGlobe', classes)}
          {renderLink('icequeen', 'IceQueen', classes)}
          {renderLink('instructions', 'Instructions', classes)}
        </Hidden>

        <Hidden smDown implementation="css">
          <div className={classes.collapse}>{links}</div>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.iconButton}
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>

      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={'right'}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.closeButtonDrawer}
          >
            <Close />
          </IconButton>

          <div className={classes.appResponsive}>{links}</div>
          <div style={{ textAlign: 'center' }}>
            {renderLinkSidebar('', 'Home', classes)}
            {renderLinkSidebar('snowglobe', 'SnowGlobe', classes)}
            {renderLinkSidebar('icequeen', 'IceQueen', classes)}
            {renderLinkSidebar('instructions', 'Instructions', classes)}
            <IconButton onClick={setNightMode} className={classes.icon}>
              {isNightMode ? <WbSunny /> : <NightsStay />}
            </IconButton>
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

const renderLink = (name, label, classes) => {
  return (
    <a className={classes.btnBoost} href={`/${name}`}>
      {label}
    </a>
  );
};

const renderLinkSidebar = (name, label, classes) => {
  return (
    <div style={{ width: '100%', paddingTop: '10px' }}>{renderLink(name, label, classes)}</div>
  );
};

const getLinkUrl = name => {
  return name === 'buy'
    ? 'https://1inch.exchange/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B/WBNB/BIFI'
    : `https://${name}.snowball.finance`;
};

export default Header;
