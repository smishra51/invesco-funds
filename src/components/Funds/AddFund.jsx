import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { fundsActions } from '../../actions';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { clientActions } from '../../actions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
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

class AddFund extends Component {

  constructor(props) {
    super();
    this.state = {
      loading : false,
      clients: [],
      fundName: '',
      sharesOwned: '',
      marketValue: '',
      pricePerShare: '',
      expiryDate: ''
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(clientActions.getClients({}));
  }

  createFund = () => {
    const { clients, fundName, sharesOwned, marketValue, pricePerShare, expiryDate } = this.state;
    const { dispatch } = this.props;
    dispatch(fundsActions.createFunds(clients.join(), fundName, sharesOwned, marketValue, pricePerShare, expiryDate));
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
                    <Typography variant="h6" component="h6" align="center">Add New Fund</Typography>
                  </Grid>
                  <ValidatorForm ref="form" onSubmit={this.createFund} className={classes.form}>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        margin="normal"
                        required
                        fullWidth
                        label="Fund Name"
                        type="text"
                        autoFocus
                        size='small'
                        value={this.state.fundName}
                        onChange={this.handleChange('fundName')}
                        validators={['required']}
                        errorMessages={['Fund name is required']}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        margin="normal"
                        required
                        fullWidth
                        label="Shares Owned"
                        type="number"
                        size='small'
                        value={this.state.sharesOwned}
                        onChange={this.handleChange('sharesOwned')}
                        validators={['required']}
                        errorMessages={['Shares owned required']}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.form}>
                        <InputLabel id="demo-simple-select-outlined-label">Clients</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.clients}
                          onChange={this.handleChange('clients')}
                          label="Select Clients"
                          size='small'
                          multiple
                        >
                          <MenuItem value="0">
                            <em>None</em>
                          </MenuItem>
                          {clients.clients.map((n) => {
                            return (<MenuItem key={n.id} value={n.id}>{n.name}</MenuItem>)
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        margin="normal"
                        required
                        size='small'
                        fullWidth
                        label="Market Value"
                        type="number"
                        autoComplete="marketValue"
                        value={this.state.marketValue}
                        onChange={this.handleChange('marketValue')}
                        validators={['required']}
                        errorMessages={['Please enter market value']}
                        
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        margin="normal"
                        required
                        fullWidth
                        label="Price Per Share"
                        type="number"
                        size='small'
                        autoComplete="pricePerShare"
                        value={this.state.pricePerShare}
                        onChange={this.handleChange('pricePerShare')}
                        validators={['required']}
                        errorMessages={['Please enter price per share']}
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
                        value={this.state.expiryDate}
                        onChange={this.handleChange('expiryDate')}
                        validators={['required']}
                        errorMessages={['Expiry Date is required']}
                      />
                    </Grid>
                    <Grid container spacing={3} justify="center" >
                      <Grid item xs={5} >
                        <Button variant="contained" type="submit" color="primary" fullWidth className={classes.submit} disabled={this.state.loading} >
                        {this.state.loading && <CircularProgress size={24} />}
                          Add Fund</Button>
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

AddFund.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    clients: state.clients
  };
}

const connectedFundsPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(AddFund)));
export { connectedFundsPage as AddFund };