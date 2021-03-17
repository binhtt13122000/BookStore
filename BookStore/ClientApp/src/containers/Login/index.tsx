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
    const { errors, setError, register, handleSubmit, clearErrors } = useForm();

    React.useEffect(() => {
        if (!props.status) {
            console.log("chua dang nhap")
        }
    }, [])
    const submitHandler = (data: AuthenticationStore.Authenticate) => {
        console.log(10);
        clearErrors();
        props.login(data, setError);
        console.log(props.authenticate);
        console.log(props.status);
    }

    if (props.status) {
        return <div>a</div>
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
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            error={errors["email"] !== null && errors["email"] !== undefined}
                            inputRef={register({ required: "Email is required." })}
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
                            label="Password"
                            type="password"
                            id="password"
                            error={errors["password"] !== null && errors["password"] !== undefined}
                            inputRef={register({ required: "Password is required." })}
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
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
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default connect(
    (state: ApplicationState) => state.authenticate,
    AuthenticationStore.actionCreators
)(Login as any)