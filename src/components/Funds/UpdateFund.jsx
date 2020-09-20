import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { clientActions } from '../../actions';
import Constant from '../../config/constant';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  button: { textTransform: 'none' },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
});

class UpdateFund extends Component {

  constructor(props) {
    super();
    this.state = {
      open : false,
      anchorEl: null
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClose = (event) => {
    this.setState({open: !this.state.open,anchorEl: event.currentTarget})
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(clientActions.getClients({}));
  }

  render() {
    const { classes, clients } = this.props;
    const isOpen = this.props.open;
    const { data } = this.props.location.state;
    let clientList = []
    let clientAdded = data.clients.split(",").map(Number)
    const clientResp = (clientAdded.length>1) ? clientAdded.length + "Clients" : (data.clients ? "1 Client": "No Client" )
    if (clients.clients) {  clientList = clients.clients.map((a) => { return clientAdded.includes(a.id) ?  a : ''}).filter(item => !!item)}
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
              <Container maxWidth="md" className={classes.paper}>
                <Grid container spacing={3} >
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h6" align="center">Fund Details</Typography>
                    <Divider />
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Fund Name</TableCell>
                            <TableCell align="right">Price/Share</TableCell>
                            <TableCell align="right">Market Value</TableCell>
                            <TableCell align="right">Shares Owned</TableCell>
                            <TableCell align="left">Clients</TableCell>
                            <TableCell align="left">Created Date</TableCell>
                            <TableCell align="center">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow key={data.id}>
                            <TableCell component="th" scope="row">
                              {data.fund_name}
                            </TableCell>
                            <TableCell align="right">{data.price_per_share}</TableCell>
                            <TableCell align="right">{data.market_value}</TableCell>
                            <TableCell align="right">{data.shares_owned}</TableCell>
                            <TableCell align="left">
                              <Button aria-controls="simple-menu" onClick={this.handleClose} className={classes.button}>{clientResp}</Button>
                              <Menu id="simple-menu" anchorEl={this.state.anchorEl} getContentAnchorEl={null} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} keepMounted open={this.state.open} onClose={this.handleClose}>
                                {clientList.map((a) => {
                                  return (<MenuItem key= {a.id}>{a.name}</MenuItem>)
                                })}
                              </Menu>
                            </TableCell>
                            <TableCell align="left">{(new Date(data.created_dt)).toLocaleDateString('en-US', Constant.DATE_OPTIONS)}</TableCell>
                            <TableCell>
                              <IconButton aria-label="update fund">
                                <EditIcon color="primary" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
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