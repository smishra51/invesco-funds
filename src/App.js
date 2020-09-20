import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { history } from './helpers';
import { PrivateRoute } from './components';
import { Header } from './components/Header';
import { DashBoard } from './components/Dashboard';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Forbiddon } from './components/ErrorPage';
import {Profile} from './components/Profile';
import { AddFund, UpdateFund } from './components/Funds'
class App extends Component {
    render() {
        return (
            <div className="App">
                <CssBaseline />
                <Container maxWidth="lg">
                    <Router history={history}>
                        <Header />
                        <div>
                            <Switch>
                                <PrivateRoute exact path='/dashboard' component={DashBoard} />
                                <Route exact path='/' component={Login} />
                                <PrivateRoute exact path='/error' component={Forbiddon} />
                                <PrivateRoute exact path='/profile' component={Profile} />
                                <PrivateRoute path='/dashboard/add' children={({ match }) => {
                                        return ( <AddFund open = {Boolean(match)}/>);
                                    }}
                                />
                                <PrivateRoute path='/dashboard/update' children={({ match }) => {
                                        return ( <UpdateFund open = {Boolean(match)}/>);
                                    }}
                                />
                            </Switch>
                        </div>
                    </Router>
                </Container>
            </div>
        );
    }
}
export default App;