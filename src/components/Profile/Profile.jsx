import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import logo from './profileIcon.png';

const styles = theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        boxShadow: "none"
    },
      media: {
        height: 240,
      },
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    }
});
class Profile extends Component {
constructor(props) {
    super();
}
    render() {
        const { classes, authentication } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="md" className={classes.paper}>
                    <Grid container spacing={4} >
                        <Grid item xs={12}>
                            <Typography variant="h5" align="center">Profile</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>
                        <Grid item xs= {4}>
                            <Card className={classes.root}>
                                <CardMedia
                                    className={classes.media}
                                    image={logo}
                                    title="Profile Picture"
                                    />
                            </Card>
                        </Grid>
                        <Grid container item xs= {7} specing={3}>
                            <Grid item xs = {4}>
                                <Typography align="left">Name</Typography>
                            </Grid>
                            <Grid item xs = {6}>
                                <Typography align="left">{authentication.userName}</Typography>
                            </Grid>
                            <Grid item xs = {4}>
                                <Typography align="left">Email</Typography>
                            </Grid>
                            <Grid item xs = {6}>
                                <Typography align="left">{authentication.email}</Typography>
                            </Grid>
                            <Grid item xs = {4}>
                                <Typography align="left">Contact No</Typography>
                            </Grid>
                            <Grid item xs = {6}>
                                <Typography align="left">9999999989</Typography>
                            </Grid>
                            <Grid item xs = {4}>
                                <Typography align="left">Address</Typography>
                            </Grid>
                            <Grid item xs = {6}>
                                <Typography align="left">Pune, India</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>

        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    };
}
const connectedProfilePage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(Profile)));
export { connectedProfilePage as Profile };
