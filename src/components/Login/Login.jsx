import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { userActions } from '../../actions';
import { history } from '../../helpers';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Box from '@material-ui/core/Box';
import CopyRight from '../CopyRight.jsx'
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

class Login extends Component {

    constructor(props) {
        super()
        this.state = {
                username: '',
                password: '',
                showPassword: false,
                setOpen:true,
                errorMessage : ''
        }
    }

    componentDidMount() {
        if (this.props.authentication.loggedIn) {
            history.push('/dashboard')
        }
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    closeIcon = () => {
        this.setState({ setOpen: !this.state.setOpen });
    }
    login = () => {
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
      };
    handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    render() {
        const { classes } = this.props;
        let message = '';
        if (this.props.authentication.errorMessage && this.state.setOpen ) {
            message = <div className={classes.root}>
                <Collapse in={true}>
                    <Alert severity="error"
                        action={
                            <IconButton  color="inherit" size="small" onClick={() => this.closeIcon()}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                        {this.props.authentication.errorMessage}
                    </Alert>
                </Collapse></div>
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {message}
                    <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <ValidatorForm ref="form" onSubmit={this.login} className={classes.form}>
                        <TextValidator
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            onChange={this.handleChange('username')}
                            name="username"
                            value={this.state.username}
                            autoFocus
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <TextValidator
                            margin="normal"
                            fullWidth
                            label="Password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            onChange={this.handleChange('password')}
                            name="password"
                            value={this.state.password}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={this.handleClickShowPassword}
                                      onMouseDown={this.handleMouseDownPassword}>
                                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={this.props.authentication.disabled}
                            className={classes.submit}
                        >
                            {this.props.authentication.disabled && <CircularProgress size={24} />}
                             Sign In</Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?  
                             </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </ValidatorForm>

                </div>
                <Box mt={8}>
                    <CopyRight />
                </Box>
            </Container>
        )
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
    };
}
const connectedLoginPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(Login)));
export { connectedLoginPage as Login };