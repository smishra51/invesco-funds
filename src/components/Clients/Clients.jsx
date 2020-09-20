import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fundsActions } from '../../actions';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';



const styles = theme => ({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  client: {
    marginTop: 80
  }
});


class Client extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fundsActions.getFunds({}));
  }

  onFundsChange = (event, values) => {
    const { dispatch } = this.props;
    if (values) {
      dispatch(fundsActions.getFundDetailsById(values.id));
    } else {
      dispatch(fundsActions.getFunds({}));
    }
  }
  render() {
    const { funds } = this.props.funds;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" className={classes.client}>
          <Autocomplete
            value={funds.fund_name}
            classes={{ option: classes.option }}
            id="clientList"
            autoHighlight
            // freeSolo
            options={funds}
            onChange={this.onFundsChange}
            // onInputChange={this.onFundsChange}
            getOptionLabel={(option) => option.fund_name}
            renderOption={(option) => (
              <React.Fragment>
                {option.fund_name}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Funds"
                style={{ margin: 8 }}
                placeholder="Search Funds by Name"
                variant="outlined"
                fullWidth
                inputProps={{
                  ...params.inputProps,
                  endadornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Container>
      </React.Fragment>
    )
  }
}

Client.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    funds: state.fund
  };
}
const connectedClientPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(Client)));
export { connectedClientPage as Client };
