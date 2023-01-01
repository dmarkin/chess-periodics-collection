import React, {useState} from "react";
import {
    AppBar,
    Box,
    Container,
    Divider,
    Hidden,
    IconButton,
    Link,
    List,
    ListItem,
    SwipeableDrawer,
    Toolbar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NewspaperIcon from '@mui/icons-material/Newspaper';

const navigationLinks = [
    {name: "Home", href: "/"},
    {name: "Add Book", href: "/books/add"},
    {name: "Facebook", href: "https://www.facebook.com/dmmarkin/"},
];

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <AppBar position="sticky" color="default">
            <Container>
                <Toolbar disableGutters>
                    <Box style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        margin: 'auto'
                    }}>
                        <NewspaperIcon/>
                        <h4>World Chess Periodics</h4>
                    </Box>

                    <Box style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        margin: 'auto'
                    }}><Hidden xsDown>
                        {navigationLinks.map((item) => (
                            <Link
                                style={{marginRight: 20}}
                                color="textPrimary"
                                variant="button"
                                underline="none"
                                href={item.href}
                                key={item.name}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </Hidden>
                    </Box>
                    <Hidden smUp>
                        <IconButton onClick={() => setOpen(true)}>
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </Container>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <div
                    onClick={() => setOpen(false)}
                    onKeyPress={() => setOpen(false)}
                    role="button"
                    tabIndex={0}
                >
                    <IconButton>
                        <ChevronRightIcon/>
                    </IconButton>
                </div>
                <Divider/>

                    <List>
                        {navigationLinks.map((item) => (
                            <ListItem key={item.name}>
                                <Link
                                    style={{marginRight: 20}}
                                    color="textPrimary"
                                    variant="button"
                                    underline="none"
                                    href={item.href}
                                >
                                    {item.name}
                                </Link>
                            </ListItem>
                        ))}
                    </List>
            </SwipeableDrawer>
        </AppBar>
    );
};

export default Header;
