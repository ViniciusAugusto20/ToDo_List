import React from 'react';
import {
  Box,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import './style.scss';

const Item = () => (
  <Box display="block">
    <ListItem role={undefined} dense button>
      <ListItemIcon>
        <Checkbox edge="start" tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText />
    </ListItem>
  </Box>
);

export default Item;
