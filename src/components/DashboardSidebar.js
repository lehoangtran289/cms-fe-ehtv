import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography } from '@material-ui/core';
import { Activity, BarChart as BarChartIcon, Book, Edit, FileText, Settings as SettingsIcon } from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/products/product_3.png',
  jobTitle: 'Ehtv CMS',
  name: 'Em Hoc Tieng Viet'
};

const items = [
  {
    href: '/app/dashboard',
    icon: Activity,
    title: 'Hướng dẫn sử dụng'
  },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  {
    href: '/app/lessons/locale',
    icon: Edit,
    title: 'Ngôn ngữ'
  },
  {
    href: '/app/message-settings',
    icon: FileText,
    title: 'Chỉnh sửa Nội dung'
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to='/app/'
        />
        <Typography
          color='textPrimary'
          variant='h5'
        >
          {user.name}
        </Typography>
        <Typography
          color='textSecondary'
          variant='body2'
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />

    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor='left'
          onClose={onMobileClose}
          open={openMobile}
          variant='temporary'
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor='left'
          open
          variant='persistent'
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default DashboardSidebar;
