import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import React, { Component } from 'react';

class CopyRight extends Component {
    render() {
        return(
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/">
                Invesco
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
        )}
}
export default CopyRight;