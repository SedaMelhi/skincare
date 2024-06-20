import { FC } from 'react';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BasicModal from '../basicModal/basicModal';
import { Button } from '@mui/material';

import style from './menuBlock.module.sass';
import { API_URL } from '@/services';

const options = ['Удалить', 'Показать на карте'];

const ITEM_HEIGHT = 48;

const MenuBlock: FC<{ id: number; getNewAddress: any }> = ({ id, getNewAddress }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // fetch(API_URL + 'v1/user.php', {
    //   method: 'POST',
    //   body: JSON.stringify({ type: 'removeAddress', token: localStorage.getItem('token'), id }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   });
    //setAnchorEl(null);
  };

  return (
    <div className="address_del">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{
          paper: style.paper,
          list: style.root,
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '180px',
          },
        }}>
        <BasicModal id={id} getNewAddress={getNewAddress}>
          <Button className={style.btnStyle}>
            <MenuItem
              onClick={handleClose}
              classes={{ gutters: style.selected, disabled: style.selected }}>
              Удалить
            </MenuItem>
          </Button>
        </BasicModal>

        <MenuItem onClick={handleClose} classes={{ gutters: style.selected }}>
          Показать на карте
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuBlock;
