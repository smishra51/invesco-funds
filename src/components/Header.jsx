import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { withRouter ,Link as ReactLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { userActions } from '../actions';
import { history } from '../helpers/history';
import AddIcon from '@material-ui/icons/Add';


const drawerWidth = 240;
const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

})
class Header extends Component {

    constructor(props) {
        super()
        this.state = {
            anchorEl: undefined,
            isMenuOpen: false,
            mobileAnchorEl: undefined,
            isMobileMenuOpen: false,
            open: false
        }
    }
    handleProfileMenuOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget, isMenuOpen: true })
    }
    handleMenuClose = () => {
        this.setState({ anchorEl: undefined, isMenuOpen: false })
    };

    handleMobileMenuClose = (event) => {
        this.setState({ mobileAnchorEl: undefined, isMobileMenuOpen: false })
    };

    handleMobileMenuOpen = (event) => {
        this.setState({ mobileAnchorEl: event.currentTarget, isMobileMenuOpen: true })
    };

    handleDrawerOpen = () => {
        this.setState({ open: true })
    };

    handleDrawerClose = () => {
        this.setState({ open: false })
    };

    logout = () => {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }
    render() {
        const { classes, authentication } = this.props;
        const menuId = 'primary-search-account-menu';
        return (
            <div classes={classes.grow}>
                <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: this.state.open })}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>Invesco</Typography>
                        <div className={classes.grow} />
                        {authentication.auth ? (
                            <div className={classes.sectionDesktop}>
                                <IconButton
                                    edge="end"
                                    aria-label="logout"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    color="inherit" onClick={() => (this.logout())}
                                >
                                    <ExitToAppIcon />
                                </IconButton>
                            </div>
                        ) : ('')}
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <Typography align="left">{authentication.userName}</Typography>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    {authentication.auth ? (
                        <div>
                            <Divider />
                            <List>
                                <ListItem button key={'Dashboard'} onClick={() => history.push('/dashboard')}>
                                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                                    <ListItemText primary={'Dashboard'} />
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem button key={'My Profile'} component= {ReactLink} to='/profile'>
                                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                    <ListItemText primary={'My Profile'} />
                                </ListItem>
                                    <ListItem button key={'createFund'} component={ReactLink} 
                                        to={{pathname: "/dashboard/add",state: { fromDashboard: true } }}>
                                        <ListItemIcon><AddIcon /></ListItemIcon>
                                        <ListItemText primary={'Create Fund'} />
                                    </ListItem>
                                <ListItem button key={'Logout'} onClick={() => (this.logout())} >
                                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                    <ListItemText primary={'Logout'} />
                                </ListItem>
                            </List>
                        </div>
                    ) : ('')}
                </Drawer>

            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    };
}
const connectedHeaderPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(Header)));

export { connectedHeaderPage as Header };
