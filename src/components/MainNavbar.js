import { Link as RouterLink } from 'react-router-dom';
import { AppBar, colors, createMuiTheme, experimentalStyled, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Logo from './Logo';

const theme = createMuiTheme();
export const LogoNameTypoWrapper = experimentalStyled(Typography)({
  marginLeft: theme.spacing(3)
});

const MainNavbar = (props) => {
  return (
    <>
      <AppBar
        elevation={0}
        {...props}
      >
        <Toolbar sx={{ height: 64 }}>
          <RouterLink to='/'>
            <Logo />
          </RouterLink>
          <LogoNameTypoWrapper variant='h3' noWrap>
            EHTV CMS
          </LogoNameTypoWrapper>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MainNavbar;
