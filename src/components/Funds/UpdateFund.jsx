import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { clientActions, fundsActions } from '../../actions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { CircularProgress } from '@material-ui/core';


const styles = theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
});


class UpdateFund extends Component {

  constructor(props) {
    super();
    this.state = {
      open: false,
      anchorEl: null,
      clients: [],

      fund_name: '',
      shares_owned: '',
      market_value: '',
      price_per_share: '',
      expiry_dt: '',
      userId: localStorage.getItem('userId'),
      id:''
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClose = (event) => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(clientActions.getClients({}));
    let data = this.props.location.state.data;
    data.clients = data.clients.split(",").map(item => Number(item)); 
    data.expiry_dt = new Date(data.expiry_dt).toISOString().split('T')[0]
    this.setState(data);
  }

  updateFund = () => {
    const { dispatch } = this.props;
    const {userId, clients, shares_owned, market_value, price_per_share, expiry_dt ,id } = this.state;
    dispatch(fundsActions.updateFund(userId, clients.join(), shares_owned, market_value, price_per_share, expiry_dt ,id))
    this.setState({loading: true});
  }

  render() {
    const { classes, clients } = this.props;
    const isOpen = this.props.open;
    
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isOpen}
            onClose={this.props.history.goBack}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={isOpen}>
              <Container maxWidth="sm" className={classes.paper}>
                  <Grid container spacing={3} >
                    <Grid item xs={12}>
                      <Typography variant="h6" component="h6" align="center">Update Fund Details</Typography>
                    </Grid>
                    <ValidatorForm ref="form" onSubmit={this.updateFund} className={classes.form}>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator margin="normal"
                        required
                        label="Fund Name"
                        type="text"
                        fullWidth
                        disabled
                        size='small'
                        value={this.state.fund_name}
                        onChange={this.handleChange('fund_name')}
                        validators={['required']}
                        errorMessages={['Fund name is required']}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        margin="normal"
                        required
                        label="Price/Share"
                        type="number"
                        fullWidth
                        size='small'
                        value={this.state.price_per_share}
                        onChange={this.handleChange('price_per_share')}
                        validators={['required']}
                        errorMessages={['required']}
                      /></Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        margin="normal"
                        required
                        label="Market Value"
                        fullWidth
                        type="number"
                        size='small'
                        value={this.state.market_value}
                        onChange={this.handleChange('market_value')}
                        validators={['required']}
                        errorMessages={['Market value required']}
                      />
                      </Grid>
                      <Grid item xs={12}>
                      <TextValidator
                        margin="normal"
                        required
                        fullWidth
                        label=""
                        type="date"
                        size='small'
                        value={this.state.expiry_dt}
                        onChange={this.handleChange('expiry_dt')}
                        validators={['required']}
                        errorMessages={['Expiry Date is required']}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        margin="normal"
                        required
                        size='small'
                        label="Shares Owned"
                        type="number"
                        fullWidth
                        value={this.state.shares_owned}
                        onChange={this.handleChange('shares_owned')}
                        validators={['required']}
                        errorMessages={['Please enter market value']}

                      /></Grid>
                    <Grid item xs={12}>
                      <InputLabel id="label">Select Clients</InputLabel>
                      <Select
                        id="clients"
                        labelId="label"
                        value={this.state.clients}
                        onChange={this.handleChange('clients')}
                        label="Select Clients"
                        size='small'
                        fullWidth
                        multiple
                      >
                        {clients.clients.map((a) => {
                          return (<MenuItem key={a.id} value = {a.id}>{a.name}</MenuItem>)
                        })}
                      </Select>
                    </Grid>
                    <Grid container spacing={3} justify="center" >
                      <Grid item xs={5} >
                        <Button variant="contained" type="submit" color="primary" className={classes.submit} disabled={this.state.loading} >
                        {this.state.loading && <CircularProgress size={24} />}
                          Update Fund</Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary" className={classes.submit} onClick={this.props.history.goBack} >Close</Button>
                      </Grid>
                    </Grid>
                    </ValidatorForm>
                  </Grid>
              </Container>
            </Fade>
          </Modal>
        </div>
      </React.Fragment>

    )
  }
}

UpdateFund.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    clients: state.clients,
  };
}

const connectedUpdateFundPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(UpdateFund)));
export { connectedUpdateFundPage as UpdateFund };