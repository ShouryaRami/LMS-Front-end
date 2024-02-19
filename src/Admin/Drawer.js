import { Button, Drawer, IconButton, List, ListItemButton, ListItemText, SwipeableDrawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import React, { useState } from 'react'

function DrawerMenu() {

    const [open,setOpen] =useState(false)
    return (
        <div>
            <Button
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={()=> setOpen(true)}
                >
                <MenuIcon />
            </Button>
            <SwipeableDrawer open={open} onClose={()=> setOpen(false)}>
                <List>
                    <ListItemButton onClick={()=> setOpen(false)}>
                        <ListItemText primary>Home</ListItemText>
                    </ListItemButton>
                </List>
            </SwipeableDrawer>
        </div>
    )
}

export default DrawerMenu