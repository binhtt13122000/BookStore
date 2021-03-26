import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import { connect } from 'react-redux';
import * as AuthenticationStore from '../../store/Authentication';
import { ApplicationState } from '../../store';
import { useForm } from 'react-hook-form'
import { Redirect, useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
    },
    warming: {
        display: "flex",
        alignItems: "center",
        color: "#f50057",
    },
    warmingIcon: {
        fontSize: "16px",
        marginBottom: "4px",
        marginRight: "4px",
    },
}));

type AuthenticateProps = AuthenticationStore.AuthenticateState & typeof AuthenticationStore.actionCreators

function Login(props: AuthenticateProps) {
    const classes = useStyles();
    const history = useHistory();
    const { errors, setError, register, handleSubmit, clearErrors } = useForm();
    const submitHandler = (data: AuthenticationStore.Authenticate) => {
        clearErrors();
        props.login(data, setError);
    }

    if (props.status) {
        if (props.authenticate.roleId === 1) {
            return <Redirect to="/home" />
        } else {
            return <Redirect to="/admin/home" />
        }
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Địa chỉ Email"
                            name="email"
                            autoFocus
                            error={errors["email"] !== null && errors["email"] !== undefined}
                            inputRef={register({
                                required: "Email không được để trống!", pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email không hợp lệ!"
                                }
                            })}
                        />
                        {errors["email"] &&
                            <div className={classes.warming}>
                                <WarningIcon className={classes.warmingIcon} />
                                <span>{errors["email"].message}</span>
                            </div>
                        }
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            error={errors["password"] !== null && errors["password"] !== undefined}
                            inputRef={register({ required: "Mật khẩu không được để trống!" })}
                        />
                        {errors["password"] &&
                            <div className={classes.warming}>
                                <WarningIcon className={classes.warmingIcon} />
                                <span>{errors["password"].message}</span>
                            </div>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {props.isLoading ? "Loading" : "Đăng nhập"}
                        </Button>
                    </form>
                        <Grid container>
                        <Grid item onClick={() => history.push("/signup")}>
                            <Typography style={{'cursor': 'pointer'}} color="primary" variant="body2">
                                {"Chưa có tài khoản trước đây? Đăng kí"}
                            </Typography>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                {'Copyright © '}
                                <Link color="inherit" href="https://material-ui.com/">
                                    Your Website
                                </Link>{' '}
                                {new Date().getFullYear()}
                                {'.'}
                            </Typography>
                        </Box>
                </div>
            </Grid>
        </Grid>
    );
}

export default connect(
    (state: ApplicationState) => state.authenticate,
    AuthenticationStore.actionCreators
)(Login as any)