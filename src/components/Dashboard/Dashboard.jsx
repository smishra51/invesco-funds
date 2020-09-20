import React, { Component } from 'react';
import { Client } from '../Clients';
import { Funds} from '../Funds';

class DashBoard extends Component {
    render() {
        return (
            <React.Fragment>
                <Client />
                <Funds/>
            </React.Fragment>
        )
    }
}
export { DashBoard };
