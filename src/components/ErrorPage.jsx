import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(10),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      errorPage : {
        marginTop: 80,
      }
  });
class Forbiddon extends Component {

    render() {
        const{ classes } = this.props;
        return (
            <div className={classes.errorPage}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>Server is Busy Right now !! Please try later</Paper>
                  </Grid>
                </Grid>
              </div>
        )
    }
}

Forbiddon.propTypes = {
    classes: PropTypes.object.isRequired,
};

const connectedForbiddonPage = withRouter(connect(null, null, null, {
    pure: false
})(withStyles(styles)(Forbiddon)));
export { connectedForbiddonPage as Forbiddon };