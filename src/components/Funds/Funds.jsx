import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import { fundsActions } from '../../actions';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import SortArrow from '@material-ui/icons/Sort';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { FundDetailPage } from './FundDetailPage'

const styles = theme => ({
  button: { textTransform: 'none' },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
});

class Funds extends Component {

  constructor(props) {
    super()
    this.state = {
      open:false
    }
  }
  // getDetails = (rowData) => {
  //   const { dispatch } = this.props;
  //   dispatch(fundsActions.getFundDetailsById(rowData.id));
  // }

//   handleOpen = event => {
//     this.setState({
//         open: true
//     })
// }
  render() {

    const tableIcons = {
      Check: () => <Check />,
      DetailPanel: () => <ChevronRight />,
      Export: () => <SaveAlt />,
      Filter: () => <FilterList />,
      FirstPage: () => <FirstPage /> ,
      LastPage: () => <LastPage />,
      NextPage: () => <ChevronRight /> ,
      PreviousPage: () => <ChevronLeft /> ,
      Search: () => <Search /> ,
      SortArrow: () => <SortArrow /> ,
      ThirdStateCheck: () => <Remove />, 
      ResetSearch: () => <ClearIcon/>,
      Add: () => <AddIcon/>,
      Clear: () => <ClearIcon/>
    }
    const { funds, loading } = this.props.funds;
    const {classes} = this.props;
    const resp = {
      columns: [
        { title: 'Funds', field: 'fund_name' },
        { title: 'Price/Share', field: 'price_per_share' ,type: 'numeric'},
        { title: 'Shares Owned', field: 'shares_owned', type: 'numeric' },
        { title: 'Market Value', field: 'market_value',type: 'numeric'},
        { title: 'Clients', field: 'clients' , render: rowData =>{
            const length = rowData.clients.split(",").length
           return (length > 1)? length +' Clients' : length +' Client'
          }},
        { title: '', field: 'action' ,sorting : false, render : rowData =><Button color="primary" className={classes.button} component={Link} to={{pathname: "/dashboard/update",state: { data: rowData } }}>details</Button> },
      ],
    }
    return (
      <React.Fragment>
          <Grid item xs={12}>
          {!loading ? (
            <MaterialTable
              icons={tableIcons}
              title="Funds List"
              columns={resp.columns}
              data={funds}
              options={{
                search: false,
                actionsColumnIndex: -1,
                }}
            />
            ) : (<div className={classes.root}><CircularProgress/></div>)}
          </Grid>
      </React.Fragment>
    )
  }
}

Funds.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    funds: state.fund
  };
}

const connectedFundsPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(Funds)));
export { connectedFundsPage as Funds };