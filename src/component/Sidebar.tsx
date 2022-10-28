import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMailBulk,
  faChevronLeft,
  faMap,
  faSearch,
  faSignOut,
  faTable
} from '@fortawesome/free-solid-svg-icons';
import { useHandler } from '@aux4/use-handler';
import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from '../event/Event';
import { logout, closeSidebar } from '../event/Action';

const SidebarDrawer = styled(Drawer)`
  & > div {
    width: 250px;
    flex-shrink: 0;
    white-space: nowrap;
    background-color: #292e3e !important;
    color: #fff !important;
  }
`;

const SidebarDivider = styled(Divider)`
  margin: 8px 0;
  backgroundcolor: #000;
`;

const SidebarHeader = styled(Box)`
  && {
    display: flex;
    align-items: center;
    padding: 8px;
    justify-content: flex-end;
  }
`;

const SidebarCloseButton = styled(ListItemButton)`
  && {
    margin-left: auto;
  }
`;

const SidebarListItemIcon = styled(ListItemIcon)`
  & {
    min-width: 40px;
    color: #fff !important;
  }
`;

const SidebarListItemText = styled(ListItemText)`
  & {
    margin-left: 0;
  }
`;

const CloseSidebarItem = styled(ListItemButton)`
  display: flex;
  justify-content: flex-end;
  height: 55px;
`;

export function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleSignOut = () => {
    logout();
    closeSidebar();
    navigate('/login');
  };
  useHandler(() => {
    setOpen(true);
  }, [OPEN_SIDEBAR]);
  useHandler(() => {
    setOpen(false);
  }, [CLOSE_SIDEBAR]);
  return (
    <SidebarDrawer anchor="left" variant="persistent" open={open}>
      <Box>
        <List>
          <CloseSidebarItem onClick={closeSidebar}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </CloseSidebarItem>
          <SidebarDivider />
          <ListItemButton component={Link} to="/" onClick={closeSidebar}>
            <SidebarListItemIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Search" />
          </ListItemButton>
          <ListItemButton component={Link} to="/" onClick={closeSidebar}>
            <SidebarListItemIcon>
              <FontAwesomeIcon icon={faMap} />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Map" />
          </ListItemButton>
          <ListItemButton component={Link} to="/list" onClick={closeSidebar}>
            <SidebarListItemIcon>
              <FontAwesomeIcon icon={faMailBulk} />
            </SidebarListItemIcon>
            <SidebarListItemText primary="List Messages" />
          </ListItemButton>
          <ListItemButton component={Link} to="/tables" onClick={closeSidebar}>
            <SidebarListItemIcon>
              <FontAwesomeIcon icon={faTable} />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Tables" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => handleSignOut()}>
            <SidebarListItemIcon>
              <FontAwesomeIcon icon={faSignOut} />
            </SidebarListItemIcon>
            <SidebarListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </SidebarDrawer>
  );
  // return (
  //   <SidebarDrawer anchor="left" variant="persistent" open={open}>
  //     <SidebarHeader>
  //       <SidebarCloseButton onClick={() => closeSidebar()}>
  //         <FontAwesomeIcon icon={faChevronLeft} />
  //       </SidebarCloseButton>
  //     </SidebarHeader>
  //     <Divider />
  //     <List>
  //       <ListItemButton component={Link} to="/search">
  //         <SidebarListItemIcon>
  //           <FontAwesomeIcon icon={faSearch} />
  //         </SidebarListItemIcon>
  //         <SidebarListItemText primary="Search" />
  //       </ListItemButton>
  //       <ListItemButton component={Link} to="/map">
  //         <SidebarListItemIcon>
  //           <FontAwesomeIcon icon={faMap} />
  //         </SidebarListItemIcon>
  //         <SidebarListItemText primary="Map" />
  //       </ListItemButton>
  //       <ListItemButton component={Link} to="/messages">
  //         <SidebarListItemIcon>
  //           <FontAwesomeIcon icon={faMailBulk} />
  //         </SidebarListItemIcon>
  //         <SidebarListItemText primary="Messages" />
  //       </ListItemButton>
  //     </List>
  //     <Divider />
  //     <CloseSidebarItem onClick={() => handleSignOut()}>
  //       <CloseSidebarIcon icon={faSignOut} />
  //       <CloseSidebarText>Logout</CloseSidebarText>
  //     </CloseSidebarItem>
  //   </SidebarDrawer>
  // );
}
